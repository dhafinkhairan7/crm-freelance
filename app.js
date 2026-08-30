document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM sepenuhnya dimuat. Sistem CRM siap!");
    
    const btnTambah = document.getElementById('btn-tambah');
    
    btnTambah.addEventListener('click', () => {
        alert("Sabar ya, fitur form tambah proyek akan kita bangun setelah ini!");
    });
});