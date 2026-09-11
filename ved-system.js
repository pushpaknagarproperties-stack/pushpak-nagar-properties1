// ved-system.js - V45 FINAL - Leads + Modals + Storage
function openEnquiryModal(project){ 
  if(project) document.getElementById('eqProject') && (document.getElementById('eqProject').value=project);
  document.getElementById('enquiryModal')?.classList.add('open');
  document.getElementById('contactForm') && window.scrollTo({top:0,behavior:'smooth'});
}
function closeModal(id){ document.getElementById(id)?.classList.remove('open'); }
function saveLead(d){
  const leads = JSON.parse(localStorage.getItem('pnp_leads')||'[]');
  d.id='PNP'+Date.now(); d.date=new Date().toLocaleString(); d.status='New';
  leads.unshift(d); localStorage.setItem('pnp_leads', JSON.stringify(leads));
  // Optional: send to sheets webhook if configured
  const wh = localStorage.getItem('sheet_webhook'); if(wh){ fetch(wh,{method:'POST',mode:'no-cors',body:JSON.stringify(d)}).catch(()=>{}); }
}
function loadLeads(){
  const leads = JSON.parse(localStorage.getItem('pnp_leads')||'[]');
  const body = document.getElementById('leadsBody'); const total = document.getElementById('leadsTotal');
  if(total) total.textContent = leads.length;
  if(!body) return; body.innerHTML='';
  leads.forEach(l=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${l.name}</td><td>${l.phone}</td><td>${l.project||'General'}</td><td>${l.location||'-'}</td><td>${l.date}</td><td>${l.status}</td><td><button class='btn btn-green btn-sm' onclick="window.open('https://wa.me/91${l.phone}?text=Hi ${l.name}, Ved & Tara from Pushpak Nagar','_blank')">WA</button></td>`;
    body.appendChild(tr);
  });
}
function exportLeadsCSV(){
  const leads = JSON.parse(localStorage.getItem('pnp_leads')||'[]');
  if(!leads.length){ alert('No leads'); return; }
  const headers=['name','phone','project','location','date','status'];
  const csv=[headers.join(',')].concat(leads.map(l=>headers.map(h=>`"${(l[h]||'').toString().replace(/"/g,'""')}"`).join(','))).join('\n');
  const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='pnp-leads.csv'; a.click();
}
document.addEventListener('DOMContentLoaded',()=>{
  loadLeads();
  document.getElementById('contactForm')?.addEventListener('submit',(e)=>{
    e.preventDefault(); const fd=new FormData(e.target);
    const d={name:fd.get('name'),phone:fd.get('phone'),project:fd.get('project'),location:fd.get('location')};
    if(!d.name || !/^[0-9]{10}$/.test(d.phone||'')){ alert('Enter Name and 10 digit Phone'); return; }
    saveLead(d); alert('Enquiry sent! Ved & Tara will call in 5 mins'); e.target.reset();
  });
  document.querySelectorAll('.modal').forEach(m=>{ m.addEventListener('click',(e)=>{ if(e.target===m) closeModal(m.id); }); });
});
function openWhatsApp(msg){ document.getElementById('waText').textContent=msg; document.getElementById('whatsappModal').classList.add('open'); document.getElementById('waOpen').onclick=()=>window.open('https://wa.me/919768983794?text='+encodeURIComponent(msg),'_blank'); }
