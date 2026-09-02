document.addEventListener('DOMContentLoaded', () => {
    // 1. Tarik Data dari LocalStorage
    let dataProyek = JSON.parse(localStorage.getItem('data_crm')) || [
        { id: 1, nama: "UI Slicing E-Commerce", user: "PT Maju Jaya", status: "In Progress", harga: "Rp 1.500.000" },
        { id: 2, nama: "Fix Bug Login Form", user: "CV Karya Tech", status: "Selesai", harga: "Rp 500.000" }
    ];

    // 2. Fungsi Simpan ke Memori
    function simpanKeLocalStorage() {
        localStorage.setItem('data_crm', JSON.stringify(dataProyek));
    }

    // Deklarasi Variabel DOM (Satu kali saja di atas agar rapi)
    const projectList = document.getElementById('project-list');
    const btnTambah = document.getElementById('btn-tambah');
    const modal = document.getElementById('modal-tambah');
    const btnTutupModal = document.getElementById('btn-tutup-modal');
    const formProyek = document.getElementById('form-proyek');

    // 3. Fungsi Render
    function renderProyek() {
        projectList.innerHTML = '';
        
        if (dataProyek.length === 0) {
            projectList.innerHTML = '<p class="text-slate-500 italic">Belum ada proyek yang aktif saat ini.</p>';
            return; 
        }

        dataProyek.forEach(proyek => {
            const card = document.createElement('div');
            card.className = 'border-b border-slate-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 hover:bg-slate-50 p-2 rounded transition';
            
            let warnaStatus = '';
            if(proyek.status === 'Selesai') warnaStatus = 'bg-green-100 text-green-700';
            else if(proyek.status === 'In Progress') warnaStatus = 'bg-blue-100 text-blue-700';
            else warnaStatus = 'bg-yellow-100 text-yellow-700';

            card.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-semibold text-slate-800">${proyek.nama}</h3>
                        <p class="text-sm text-slate-500">User (Pelanggan): <span class="font-medium">${proyek.user}</span></p>
                    </div>
                    <div class="text-right">
                        <span class="px-3 py-1 text-xs font-bold rounded-full ${warnaStatus}">${proyek.status}</span>
                        <p class="text-sm font-bold mt-2 text-slate-700">${proyek.harga}</p>
                    </div>
                </div>
                <div class="mt-4 flex justify-end border-t border-slate-100 pt-2">
                    <button class="btn-hapus text-red-500 hover:text-red-700 text-sm font-bold flex items-center transition" data-id="${proyek.id}">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Hapus
                    </button>
                </div>
            `;
            projectList.appendChild(card);
        });
    }

    // Panggil render pertama kali
    renderProyek();

    // 4. Event Buka/Tutup Modal
    btnTambah.addEventListener('click', () => modal.classList.remove('hidden'));
    btnTutupModal.addEventListener('click', () => modal.classList.add('hidden'));

    // 5. Menangani Submit Form (Fitur CREATE)
    formProyek.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Logika Auto-Increment ID yang aman
        const idBaru = dataProyek.length > 0 ? Math.max(...dataProyek.map(p => p.id)) + 1 : 1;

        const proyekBaru = {
            id: idBaru, 
            nama: document.getElementById('input-nama').value,
            user: document.getElementById('input-user').value,
            status: "Review",
            harga: document.getElementById('input-harga').value
        };

        dataProyek.push(proyekBaru);
        simpanKeLocalStorage(); 
        renderProyek();
        
        formProyek.reset();
        modal.classList.add('hidden');
    });

    // 6. Fitur Hapus (Event Delegation)
    projectList.addEventListener('click', (e) => {
        const tombolHapus = e.target.closest('.btn-hapus');
        if (tombolHapus) {
            const idYangDihapus = parseInt(tombolHapus.getAttribute('data-id'));
            if (confirm("Apakah kamu yakin ingin menghapus proyek ini?")) {
                dataProyek = dataProyek.filter(proyek => proyek.id !== idYangDihapus);
                simpanKeLocalStorage(); 
                renderProyek();
            }
        }
    });
});