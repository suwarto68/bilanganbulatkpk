import { User, ExamResult, ExamSettings } from '../types';

export interface SheetSyncResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const APPS_SCRIPT_TEMPLATE = `/**
 * GOOGLE APPS SCRIPT UNTUK CBT ANBK MATEMATIKA SMP FASE D
 * ----------------------------------------------------
 * Solusi Error "Cannot read properties of undefined (reading 'parameter')":
 * Fungsi 'doGet(e)' dan 'doPost(e)' berjalan saat dipanggil via URL Web App.
 * Jika Anda ingin menguji langsung dari tombol "Jalankan" (Run) di editor Google Apps Script,
 * pilih fungsi 'testScript' pada menu dropdown di atas, lalu klik 'Jalankan'.
 */

// 1. FUNGSI UNTUK REQUEST GET DARI APLIKASI WEB CBT
function doGet(e) {
  try {
    // Penanganan aman jika diuji langsung tanpa parameter HTTP (e undefined)
    e = e || { parameter: {} };
    var parameter = e.parameter || {};
    var action = parameter.action || 'test';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsExist(ss);

    if (action === 'test') {
      return createJsonResponse({
        success: true,
        message: 'Koneksi ke Google Spreadsheet Berhasil Terhubung!',
        spreadsheetName: ss.getName(),
        activeSheet: ss.getActiveSheet().getName()
      });
    }

    if (action === 'getUsers') {
      var sheet = ss.getSheetByName('UserLogin');
      var data = sheet.getDataRange().getValues();
      var users = [];
      
      // Lewati baris header (indeks 0)
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (row[0] && String(row[0]).trim() !== '') {
          users.push({
            id: 'usr_' + (row[0] || i),
            username: String(row[0]).trim(),
            password: String(row[1] || 'pass123').trim(),
            name: String(row[2] || row[0]).trim(),
            role: String(row[3] || 'siswa').toLowerCase().trim(),
            kelas: String(row[4] || '-').trim(),
            nisn: String(row[5] || '-').trim(),
            gender: String(row[6] || 'L').trim()
          });
        }
      }

      return createJsonResponse({
        success: true,
        message: 'Berhasil memuat data ' + users.length + ' pengguna dari sheet UserLogin',
        users: users
      });
    }

    return createJsonResponse({ success: false, message: 'Aksi GET tidak dikenali: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, message: 'Galat pada doGet: ' + err.toString() });
  }
}

// 2. FUNGSI UNTUK REQUEST POST (SIMPAN HASIL / SINKRON PENGGUNA)
function doPost(e) {
  try {
    e = e || {};
    var rawContent = (e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var postData = {};
    
    try {
      postData = JSON.parse(rawContent);
    } catch(parseErr) {
      return createJsonResponse({ success: false, message: 'Format data JSON tidak valid: ' + parseErr.toString() });
    }

    var action = postData.action || (e.parameter && e.parameter.action);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsExist(ss);

    if (action === 'saveResult') {
      var res = postData.result;
      if (!res) {
        return createJsonResponse({ success: false, message: 'Data hasil ujian (result) kosong' });
      }

      var sheet = ss.getSheetByName('JawabanUjian');

      // Siapkan ringkasan jawaban tiap nomor 1-35
      var answerSummary = [];
      for (var qNum = 1; qNum <= 35; qNum++) {
        var ans = res.answers && res.answers[qNum];
        if (!ans || !ans.isAnswered) {
          answerSummary.push('-');
        } else if (ans.pgAnswer) {
          answerSummary.push(ans.pgAnswer);
        } else if (ans.pgKompleksAnswers && ans.pgKompleksAnswers.length > 0) {
          answerSummary.push(ans.pgKompleksAnswers.join(', '));
        } else if (ans.matchingAnswers) {
          var pairs = [];
          for (var pKey in ans.matchingAnswers) {
            pairs.push(pKey + '->' + ans.matchingAnswers[pKey]);
          }
          answerSummary.push(pairs.join('; '));
        } else if (ans.trueFalseAnswers) {
          var tfList = [];
          for (var tfKey in ans.trueFalseAnswers) {
            tfList.push(tfKey + ':' + ans.trueFalseAnswers[tfKey]);
          }
          answerSummary.push(tfList.join('; '));
        } else {
          answerSummary.push('Sudah Dijawab');
        }
      }

      var rowData = [
        new Date(),
        res.username || '-',
        res.studentName || '-',
        res.kelas || '-',
        res.nisn || '-',
        res.totalScore !== undefined ? res.totalScore : 0,
        res.competencyLevel || 'Dasar',
        res.correctCount || 0,
        res.partialCount || 0,
        res.wrongCount || 0,
        (res.durationSpentMinutes || 0) + ' menit',
        res.startTime || '-',
        res.finishTime || '-'
      ].concat(answerSummary);

      sheet.appendRow(rowData);

      return createJsonResponse({
        success: true,
        message: 'Hasil ujian ' + (res.studentName || '') + ' berhasil disimpan ke sheet JawabanUjian!',
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'syncUsers') {
      var usersToSync = postData.users || [];
      var sheetUser = ss.getSheetByName('UserLogin');
      
      // Bersihkan data lama kecuali header
      var lastRow = sheetUser.getLastRow();
      if (lastRow > 1) {
        sheetUser.getRange(2, 1, lastRow - 1, 7).clearContent();
      }

      var rows = usersToSync.map(function(u) {
        return [
          u.username,
          u.password || 'pass123',
          u.name,
          u.role || 'siswa',
          u.kelas || '-',
          u.nisn || '-',
          u.gender || 'L'
        ];
      });

      if (rows.length > 0) {
        sheetUser.getRange(2, 1, rows.length, 7).setValues(rows);
      }

      return createJsonResponse({
        success: true,
        message: 'Berhasil menyinkronkan ' + rows.length + ' pengguna ke sheet UserLogin!'
      });
    }

    return createJsonResponse({ success: false, message: 'Aksi POST tidak dikenali: ' + action });

  } catch (err) {
    return createJsonResponse({ success: false, message: 'Terjadi kesalahan pada doPost: ' + err.toString() });
  }
}

// 3. FUNGSI UNTUK UJI COBA MANUAL DARI GOOGLE APPS SCRIPT EDITOR
// (Pilih fungsi 'testScript' di dropdown menu editor Apps Script lalu klik tombol 'Jalankan')
function testScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsExist(ss);
  Logger.log('SUKSES: Spreadsheet ' + ss.getName() + ' siap digunakan!');
  Logger.log('Tab UserLogin dan JawabanUjian sudah dibuat dan terformat.');
  return 'OK';
}

// 4. PEMBUATAN OTOMATIS TAB DAN HEADER JIKA BELUM ADA
function ensureSheetsExist(ss) {
  var userSheet = ss.getSheetByName('UserLogin');
  if (!userSheet) {
    userSheet = ss.insertSheet('UserLogin');
    userSheet.appendRow(['Username', 'Password', 'Nama Lengkap', 'Role (siswa/admin)', 'Kelas', 'NISN', 'Jenis Kelamin (L/P)']);
    userSheet.getRange('A1:G1').setBackground('#0B56A4').setFontColor('#FFFFFF').setFontWeight('bold');
    
    // Isi akun sample awal
    userSheet.appendRow(['admin', 'admin123', 'Drs. Supriyanto, M.Pd.', 'admin', 'Administrator CBT', '197805122005011003', 'L']);
    userSheet.appendRow(['siswa01', 'pass123', 'Ahmad Fauzan Pratama', 'siswa', 'VII-A', '0098472190', 'L']);
    userSheet.appendRow(['siswa02', 'pass123', 'Nabila Azzahra Putri', 'siswa', 'VII-A', '0098472191', 'P']);
    userSheet.appendRow(['siswa03', 'pass123', 'Muhammad Rizky Ramadhan', 'siswa', 'VII-B', '0098472192', 'L']);
    userSheet.appendRow(['siswa04', 'pass123', 'Siti Nur Aisyah', 'siswa', 'VII-B', '0098472193', 'P']);
  }

  var resSheet = ss.getSheetByName('JawabanUjian');
  if (!resSheet) {
    resSheet = ss.insertSheet('JawabanUjian');
    var headers = [
      'Timestamp', 'Username', 'Nama Siswa', 'Kelas', 'NISN', 
      'Skor Akhir (0-100)', 'Kategori Capaian', 'Benar', 'Sebagian', 'Salah', 
      'Durasi Pengerjaan', 'Waktu Mulai', 'Waktu Selesai'
    ];
    for (var i = 1; i <= 35; i++) {
      headers.push('No_' + i);
    }
    resSheet.appendRow(headers);
    resSheet.getRange(1, 1, 1, headers.length).setBackground('#107C41').setFontColor('#FFFFFF').setFontWeight('bold');
  }
}

// 5. HELPER FORMAT OUTPUT JSON DENGAN CORS AMAN
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

export const GoogleSheetsService = {
  async testConnection(webAppUrl: string): Promise<SheetSyncResponse> {
    if (!webAppUrl || !webAppUrl.trim().startsWith('http')) {
      return {
        success: false,
        message: 'URL Google Apps Script belum diisi atau format tidak valid.'
      };
    }

    try {
      const targetUrl = webAppUrl.includes('?') ? `${webAppUrl}&action=test` : `${webAppUrl}?action=test`;
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: result.success || true,
        message: result.message || 'Koneksi ke Google Spreadsheet berhasil!',
        data: result
      };
    } catch (err: any) {
      console.warn('Google Sheets test connection direct fetch error:', err);
      return {
        success: false,
        message: `Gagal menghubungkan ke Google Spreadsheet: ${err.message || 'Cek kembali izin akses Web App (Siapa saja / Anyone)'}.`
      };
    }
  },

  async fetchUsersFromSheet(webAppUrl: string): Promise<{ success: boolean; users?: User[]; message: string }> {
    if (!webAppUrl || !webAppUrl.trim().startsWith('http')) {
      return {
        success: false,
        message: 'URL Web App Spreadsheet belum dikonfigurasi.'
      };
    }

    try {
      const targetUrl = webAppUrl.includes('?') ? `${webAppUrl}&action=getUsers` : `${webAppUrl}?action=getUsers`;
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.users)) {
        return {
          success: true,
          users: result.users,
          message: result.message || `Berhasil mengimpor ${result.users.length} pengguna dari Google Spreadsheet.`
        };
      } else {
        return {
          success: false,
          message: result.message || 'Gagal membaca data dari sheet UserLogin.'
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: `Koneksi Google Spreadsheet gagal: ${err.message}`
      };
    }
  },

  async sendExamResultToSheet(result: ExamResult, settings: ExamSettings): Promise<SheetSyncResponse> {
    if (!settings.googleSheetWebAppUrl || !settings.googleSheetWebAppUrl.trim().startsWith('http')) {
      return {
        success: false,
        message: 'URL Google Sheets belum diatur di menu Pengaturan. Hasil tersimpan di penyimpanan lokal.'
      };
    }

    try {
      const response = await fetch(settings.googleSheetWebAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Apps script handles plain text POST with JSON nicely
        },
        body: JSON.stringify({
          action: 'saveResult',
          result: result
        }),
        mode: 'cors'
      });

      const resData = await response.json().catch(() => null);
      if (resData && resData.success) {
        return {
          success: true,
          message: 'Hasil ujian berhasil disinkronkan ke Google Spreadsheet!',
          data: resData
        };
      }

      return {
        success: true,
        message: 'Hasil ujian telah dikirim ke Google Spreadsheet.'
      };
    } catch (err: any) {
      console.error('Failed to send result to Google Sheets:', err);
      return {
        success: false,
        message: `Gagal mengirim ke Google Sheets: ${err.message}. Hasil tersimpan aman di database aplikasi.`
      };
    }
  },

  async syncUsersToSheet(users: User[], webAppUrl: string): Promise<SheetSyncResponse> {
    if (!webAppUrl || !webAppUrl.trim().startsWith('http')) {
      return {
        success: false,
        message: 'URL Web App Google Sheets belum diatur.'
      };
    }

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'syncUsers',
          users: users
        }),
        mode: 'cors'
      });

      const resData = await response.json().catch(() => null);
      return {
        success: resData?.success ?? true,
        message: resData?.message || 'Data pengguna berhasil diekspor ke sheet UserLogin Google Spreadsheet!'
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal sinkronisasi data pengguna ke Spreadsheet: ${err.message}`
      };
    }
  }
};
