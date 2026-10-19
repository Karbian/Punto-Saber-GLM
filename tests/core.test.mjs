import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {AREAS,selectQuestions,evaluate,remainingSeconds,formatTime,normalize,isCorrect,questionStatus} from '../core.mjs';
const bank=JSON.parse(fs.readFileSync(new URL('../bank.json',import.meta.url)));
const qs=bank.questions;
test('bank has 140 distinct questions and 111 original PDFs with complete references',()=>{
 assert.equal(qs.length,140);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);assert.equal(bank.catalog.length,111);
 for(const q of qs){assert([3,4].includes(q.options.length));assert(q.explanation.length>50,q.id);assert(AREAS.some(a=>a.id===q.area));for(const a of q.answers)assert('ABCD'.slice(0,q.options.length).includes(a));assert(fs.existsSync(new URL('../'+q.source,import.meta.url)),q.source);assert(fs.existsSync(new URL('../'+q.answerSource,import.meta.url)));if(q.image)assert(fs.existsSync(new URL('../'+q.image.url,import.meta.url)));}
 assert(!qs.some(q=>q.period==='2005-1'&&q.number===16&&q.discipline==='Matemáticas'));
 for(const p of bank.catalog)assert(fs.existsSync(new URL('../'+p.url,import.meta.url)));
});
test('mixed sessions balance the five areas, avoid duplicate questions, and do not mutate the bank',()=>{
 const before=qs.map(q=>q.id);for(const n of [1,5,10,20,40,60,80,140,160]){const chosen=selectQuestions(qs,{count:n});assert.equal(chosen.length,Math.min(n,qs.length));assert.equal(new Set(chosen.map(q=>q.id)).size,chosen.length);if(n>=5)for(const a of AREAS)assert(chosen.some(q=>q.area===a.id));}
 assert.deepEqual(qs.map(q=>q.id),before);
});
test('area, filtered subset, and small collections never pull unrelated questions',()=>{
 const ten=selectQuestions(qs,{area:'ingles',count:40});assert.equal(ten.length,qs.filter(q=>q.area==='ingles').length);assert(ten.every(q=>q.area==='ingles'));
 const ids=qs.slice(5,8).map(q=>q.id);const selected=selectQuestions(qs,{ids,count:10});assert.equal(selected.length,3);assert(selected.every(q=>ids.includes(q.id)));
 assert.deepEqual(selectQuestions(qs,{ids:[],count:10}),[]);
});
test('both historical valid alternatives are accepted, and invalid options are rejected',()=>{
 for(const n of [21,22,23,24]){const q=qs.find(q=>q.number===n);assert.equal(q.answers.length,2);for(const a of q.answers)assert(isCorrect(q,a));for(const a of ['A','B','C','D'].filter(a=>!q.answers.includes(a)))assert(!isCorrect(q,a));}
});
test('score uses all questions as denominator, including omissions',()=>{
 const sample=qs.slice(0,4);const answers={[sample[0].id]:sample[0].answers[0],[sample[1].id]:['A','B','C','D'].find(a=>!sample[1].answers.includes(a)),[sample[2].id]:sample[2].answers[0]};
 const result=evaluate(sample,answers);assert.deepEqual([result.total,result.answered,result.correct,result.incorrect,result.omitted,result.percentage],[4,3,2,1,1,50]);assert.equal(Object.values(result.byArea).reduce((a,b)=>a+b.total,0),4);
 assert.equal(evaluate([],{}).percentage,0);
});
test('timer uses an absolute deadline and cannot be reset by reloading serialized state',()=>{
 const session={mode:'exam',startedAt:0,deadline:120000};assert.equal(remainingSeconds(session,0),120);assert.equal(remainingSeconds(session,60001),60);assert.equal(remainingSeconds(JSON.parse(JSON.stringify(session)),90000),30);assert.equal(remainingSeconds(session,180000),0);assert.equal(remainingSeconds({mode:'learn'},500),null);assert.equal(formatTime(125),'02:05');assert.equal(formatTime(-1),'00:00');
});
test('latest attempt determines review status; normalized search handles accents',()=>{
 const q=qs[0];assert.equal(questionStatus(q,{attempts:{}}),'new');assert.equal(questionStatus(q,{attempts:{[q.id]:[{correct:true},{correct:false}]}}),'review');assert.equal(questionStatus(q,{attempts:{[q.id]:[{correct:false},{correct:true}]}}),'correct');assert.equal(normalize('Matemáticas, QUÍMICA'),'matematicas, quimica');
});
test('new material adds sixteen exercises per area and keeps answer provenance explicit',()=>{
 const added=qs.filter(q=>q.period!=='2005-1');assert.equal(added.length,80);
 for(const a of AREAS)assert.equal(added.filter(q=>q.area===a.id).length,16);
 assert.equal(added.filter(q=>q.period==='2023-1').length,60);
 assert.equal(added.filter(q=>q.origin==='original').length,20);
 for(const q of added){assert.equal(q.answerVerification,'independent');assert(!q.keySheet);assert(!q.keyRow);if(q.origin==='original')assert(q.sourceNote.includes('no es una pregunta oficial'));else assert(q.page>0);}
 assert(!bank.catalog.some(p=>p.url.includes('ICFES_2025CalA')));
});
test('a nonexistent fourth choice on a three-option item is an omission',()=>{
 const q=qs.find(q=>q.options.length===3);assert(q);
 const result=evaluate([q],{[q.id]:'D'});assert.equal(result.answered,0);assert.equal(result.omitted,1);assert.equal(result.correct,0);
 assert.equal(evaluate([q],{[q.id]:q.answers[0]}).percentage,100);
});
