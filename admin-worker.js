// Cloudflare Worker for Dreamworld global announcements/restarts.
// Create a KV namespace named DREAMWORLD_STATE and bind it to this Worker as DREAMWORLD_STATE.
// Add Worker secret ADMIN_CODE with the desired private administrator code.
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'}});
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (request.method === 'OPTIONS') return new Response(null,{headers:cors});
  if (url.pathname === '/state' && request.method === 'GET') {
   const state = await env.DREAMWORLD_STATE.get('state','json') || {restartAt:0,messages:[]};
   return json(state);
  }
  if (url.pathname === '/admin' && request.method === 'POST') {
   let body; try { body = await request.json(); } catch { return json({error:'Invalid JSON'},400); }
   if (!env.ADMIN_CODE || typeof body.code !== 'string' || body.code !== env.ADMIN_CODE) return json({error:'Access denied'},401);
   if (body.action === 'check') return json({ok:true});
   const state = await env.DREAMWORLD_STATE.get('state','json') || {restartAt:0,messages:[],nextId:1};
   if (body.action === 'restart') state.restartAt = Date.now();
   else if (body.action === 'message') {
    const message = String(body.message || '').trim().slice(0,240);
    if (!message) return json({error:'Message required'},400);
    state.nextId = Number(state.nextId || 1);
    state.messages = [...(state.messages || []), {id:state.nextId++, text:message, createdAt:Date.now()}].slice(-10);
   } else if (body.action !== 'refresh') return json({error:'Unknown action'},400);
   await env.DREAMWORLD_STATE.put('state',JSON.stringify(state));
   return json({ok:true,restartAt:state.restartAt,messages:state.messages});
  }
  return json({error:'Not found'},404);
 }
};
