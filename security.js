// security.js - V45 FINAL - PIN Protection 221978 / 983794
(function(){
  const PIN='221978'; const ALT='983794';
  function checkPin(){
    if(location.pathname.includes('admin') || location.pathname.includes('dashboard') || location.pathname.includes('properties-admin') || location.pathname.includes('leads') || location.pathname.includes('media-library') || location.pathname.includes('file-manager') || location.pathname.includes('marketing-formats') || location.pathname.includes('r2-setup') || location.pathname.includes('admin-security')){
      const saved=sessionStorage.getItem('pnp_admin_auth');
      if(saved==='ok') return;
      const p=prompt('Enter Admin PIN (221978):');
      if(p===PIN || p===ALT){ sessionStorage.setItem('pnp_admin_auth','ok'); }
      else{ alert('Wrong PIN'); location.href='index.html'; }
    }
  }
  checkPin();
})();
