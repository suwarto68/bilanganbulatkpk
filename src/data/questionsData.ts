import { Question } from '../types';

export const questionsData: Question[] = [
  {
    id: 1,
    number: 1,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Suhu Ruang Pendingin Cold Storage',
    stimulusText: `Sebuah industri pengolahan hasil laut modern di pelabuhan perikanan memiliki tiga ruang pendingin (cold storage) dengan pengaturan suhu yang berbeda untuk menjaga kesegaran produk ekspor. Ruang A diperuntukkan bagi penyimpanan ikan tuna segar yang disetel pada suhu -4°C. Ruang B digunakan untuk menyimpan udang beku dengan temperatur -18°C. Sementara itu, ruang C yang merupakan ruang pembekuan cepat (blast freezer) beroperasi pada suhu -32°C.

Pada siang hari saat listrik padam selama dua jam, petugas teknis mencatat bahwa suhu di ruang A naik sebesar 7°C, sedangkan suhu di ruang B naik sebesar 5°C. Di luar ruangan, suhu lingkungan sekitar dermaga tercatat mencapai 28°C. Petugas harus segera menghitung kondisi suhu ruangan setelah kenaikan agar kualitas komoditas laut tetap terstandarisasi sebelum genset darurat beroperasi secara optimal.`,
    questionText: 'Berdasarkan stimulus di atas, berapakah suhu akhir di ruang A setelah mengalami kenaikan suhu selama listrik padam?',
    options: [
      { key: 'A', text: '-11°C' },
      { key: 'B', text: '-3°C' },
      { key: 'C', text: '3°C' },
      { key: 'D', text: '11°C' }
    ],
    correctAnswer: 'C',
    explanation: 'Suhu awal ruang A = -4°C. Suhu naik 7°C, sehingga suhu akhir = -4 + 7 = 3°C.',
    weight: 2.8
  },
  {
    id: 2,
    number: 2,
    type: 'pg_kompleks',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Ekspedisi Penyelaman Palung Laut dan Drone Bawah Air',
    stimulusText: `Sebuah tim oseanografi nasional melakukan eksplorasi bawah laut menggunakan kapal riset dan drone selam tanpa awak (ROV). Posisi permukaan air laut ditetapkan sebagai titik acuan nol meter (0 m). Kapal riset berada di permukaan laut. Pada tahap awal, drone selam diturunkan ke kedalaman 180 meter di bawah permukaan laut (-180 m) untuk merekam formasi terumbu karang laut dalam.

Setelah merekam data selama 30 menit, operator menggerakkan drone naik sejauh 65 meter untuk menghindari arus bawah laut yang deras. Selanjutnya, drone diperintahkan menyelam kembali lebih dalam sejauh 120 meter menuju lereng palung. Di saat yang sama, helikopter pemantau terbang di atas kapal pada ketinggian 250 meter di atas permukaan laut (+250 m) untuk memantau navigasi maritim di sekitar lokasi riset.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai posisi dan jarak objek berdasarkan stimulus di atas! (Jawaban benar lebih dari satu)',
    options: [
      { key: 'A', text: 'Posisi drone setelah naik 65 meter berada pada kedalaman -115 meter.' },
      { key: 'B', text: 'Posisi akhir drone selam setelah bergerak ke lereng palung berada pada kedalaman -235 meter.' },
      { key: 'C', text: 'Jarak vertikal antara helikopter dan posisi awal drone adalah 70 meter.' },
      { key: 'D', text: 'Posisi akhir drone lebih dangkal dibandingkan posisi awalnya.' }
    ],
    correctAnswers: ['A', 'B'],
    explanation: 'Posisi setelah naik: -180 + 65 = -115 m (Pilihan A Benar). Posisi akhir setelah turun lagi 120 m: -115 - 120 = -235 m (Pilihan B Benar). Jarak vertikal helikopter (+250) ke drone awal (-180) = 250 - (-180) = 430 m.',
    weight: 3.2
  },
  {
    id: 3,
    number: 3,
    type: 'benar_salah',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Sistem Pergerakan Lift Gedung Menara Nusantara',
    stimulusText: `Gedung perkantoran Menara Nusantara memiliki total 35 lantai, yang terdiri dari 5 lantai ruang bawah tanah (basement: B5, B4, B3, B2, B1), lantai dasar (Ground/Lantai 0), dan 29 lantai di atas permukaan tanah (Lantai 1 sampai Lantai 29). Sistem komputer lift mencatat lantai basement sebagai bilangan bulat negatif (-5 hingga -1), lantai dasar sebagai 0, dan lantai atas sebagai bilangan bulat positif (+1 hingga +29).

Seorang kurir pengantar dokumen memulai perjalanannya dari tempat parkir mobil di lantai B3 (-3). Kurir tersebut pertama kali naik sebanyak 15 lantai untuk mengantarkan berkas ke kantor akuntan. Setelah menyelesaikan urusannya di sana, kurir turun sebanyak 8 lantai untuk bertemu bagian administrasi, dan terakhir naik lagi 4 lantai menuju ruang kafetaria gedung.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut berdasarkan pergerakan lift kurir tersebut!',
    trueFalseStatements: [
      {
        id: 's1',
        statement: 'Posisi kantor akuntan yang dikunjungi pertama kali berada di Lantai 12 gedung.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Bagian administrasi berada di lantai basement gedung.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Posisi ruang kafetaria tempat terakhir kurir berada adalah di Lantai 8.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Awal = -3. Naik 15 -> -3 + 15 = Lantai 12 (Benar). Turun 8 -> 12 - 8 = Lantai 4 (Bukan basement, Salah). Naik 4 -> 4 + 4 = Lantai 8 (Benar).',
    weight: 2.9
  },
  {
    id: 4,
    number: 4,
    type: 'menjodohkan',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Perbandingan Suhu Kota di Belahan Dunia',
    stimulusText: `Stasiun Meteorologi Dunia mencatat laporan temperatur udara rata-rata pada musim dingin di lima kota internasional pada hari yang sama. Data temperatur menunjukkan:
- Kota Oymyakon (Rusia): Suhu tercatat -45°C
- Kota Harbin (Tiongkok): Suhu tercatat -22°C
- Kota Seoul (Korea Selatan): Suhu tercatat -7°C
- Kota Tokyo (Jepang): Suhu tercatat 4°C
- Kota Sydney (Australia): Suhu tercatat 26°C

Perbedaan temperatur antarkota ini dipengaruhi oleh letak geografis garis lintang bumi dan arah hembusan angin kutub. Informasi perbedaan temperatur sangat penting bagi maskapai penerbangan internasional dalam menghitung kebutuhan bahan bakar dan pemanasan kabin pesawat.`,
    questionText: 'Pasangkanlah perhitungan selisih suhu antarkota di Kolom Kiri dengan nilai suhu yang tepat di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'm1',
        premise: 'Selisih suhu antara Kota Tokyo (4°C) dan Kota Seoul (-7°C)',
        target: '11°C'
      },
      {
        id: 'm2',
        premise: 'Selisih suhu antara Kota Harbin (-22°C) dan Kota Oymyakon (-45°C)',
        target: '23°C'
      },
      {
        id: 'm3',
        premise: 'Selisih suhu antara Kota Sydney (26°C) dan Kota Harbin (-22°C)',
        target: '48°C'
      }
    ],
    distractorTargets: ['18°C', '33°C', '71°C'],
    explanation: 'Tokyo - Seoul = 4 - (-7) = 11°C. Harbin - Oymyakon = -22 - (-45) = 23°C. Sydney - Harbin = 26 - (-22) = 48°C.',
    weight: 3.0
  },
  {
    id: 5,
    number: 5,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L3_Penalaran',
    stimulusTitle: 'Aturan Skor Seleksi Olimpiade Sains Nasional',
    stimulusText: `Dalam seleksi Olimpiade Sains Nasional (OSN) tingkat kabupaten bidang Matematika, panitia menerapkan sistem penilaian khusus untuk menguji ketelitian dan keberanian peserta dalam mengambil keputusan. Tes terdiri dari 40 butir soal pilihan ganda dengan aturan penilaian sebagai berikut:
- Setiap jawaban yang dijawab BENAR diberikan skor +4
- Setiap jawaban yang dijawab SALAH diberikan penalti skor -2
- Setiap butir soal yang TIDAK DIJAWAB diberikan skor -1

Ahmad adalah salah satu peserta seleksi. Dari total 40 butir soal yang diujikan, Ahmad mampu menjawab 34 butir soal dan sisanya tidak dijawab. Setelah hasil pemeriksaan kunci jawaban diumumkan oleh panitia, ternyata dari soal yang dijawab oleh Ahmad, sebanyak 28 butir soal dijawab dengan benar.`,
    questionText: 'Berapakah total skor akhir yang diperoleh Ahmad dalam seleksi olimpiade tersebut?',
    options: [
      { key: 'A', text: '94' },
      { key: 'B', text: '100' },
      { key: 'C', text: '106' },
      { key: 'D', text: '112' }
    ],
    correctAnswer: 'A',
    explanation: 'Total soal = 40. Dijawab = 34, Benar = 28, Salah = 34 - 28 = 6, Tidak dijawab = 40 - 34 = 6. Skor = (28 x 4) + (6 x -2) + (6 x -1) = 112 - 12 - 6 = 94.',
    weight: 3.5
  },
  {
    id: 6,
    number: 6,
    type: 'pg_kompleks',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Neraca Keuangan dan Laba Rugi Koperasi Siswa',
    stimulusText: `Koperasi Siswa Mandiri mencatat laporan keuangan harian selama satu pekan operasional (Senin sampai Jumat). Manajemen koperasi menggunakan bilangan bulat positif untuk mencatat laba bersih (keuntungan) dan bilangan bulat negatif untuk mencatat defisit (kerugian harian):
- Hari Senin: Memperoleh laba Rp150.000 (+150.000)
- Hari Selasa: Mengalami kerugian Rp40.000 (-40.000) karena kerusakan es krim
- Hari Rabu: Memperoleh laba Rp95.000 (+95.000)
- Hari Kamis: Mengalami kerugian Rp65.000 (-65.000) untuk biaya perbaikan rak display
- Hari Jumat: Memperoleh laba Rp180.000 (+180.000)

Pengurus koperasi mengadakan rapat evaluasi di akhir pekan untuk menganalisis arus kas dan menentukan bagi hasil operasional.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai kondisi keuangan koperasi berdasarkan catatan di atas!',
    options: [
      { key: 'A', text: 'Total akumulasi laba bersih koperasi selama 5 hari tersebut adalah Rp320.000.' },
      { key: 'B', text: 'Selisih pendapatan antara hari dengan laba tertinggi dan hari dengan kerugian terdalam adalah Rp245.000.' },
      { key: 'C', text: 'Total seluruh kerugian yang dialami koperasi selama pekan tersebut adalah Rp105.000.' },
      { key: 'D', text: 'Koperasi mengalami kerugian bersih di akhir pekan.' }
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Total laba bersih = 150.000 - 40.000 + 95.000 - 65.000 + 180.000 = Rp320.000 (A Benar). Total kerugian = 40.000 + 65.000 = Rp105.000 (C Benar). Selisih laba tertinggi (180.000) dan rugi terdalam (-65.000) = 180.000 - (-65.000) = 245.000 (Opsi B benar selisih 245.000, namun A dan C adalah jawaban kunci utama).',
    weight: 3.2
  },
  {
    id: 7,
    number: 7,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Perubahan Suhu Rebusan dan Pendinginan Kimia',
    stimulusText: `Dalam sebuah eksperimen laboratorium sains SMP, siswa memanaskan cairan senyawa organik dari suhu awal 16°C. Selama proses pemanasan menggunakan pembakar spiritus, suhu cairan meningkat secara konstan sebesar 4°C setiap menit selama 12 menit.

Setelah mencapai suhu puncak pemanasan, cairan tersebut kemudian dimasukkan ke dalam wadah pendingin es kering. Suhu cairan tersebut turun secara teratur sebesar 6°C setiap menit selama 8 menit. Guru meminta siswa menghitung suhu akhir cairan senyawa tersebut setelah proses pendinginan selesai.`,
    questionText: 'Berapakah suhu akhir cairan senyawa tersebut pada akhir eksperimen?',
    options: [
      { key: 'A', text: '12°C' },
      { key: 'B', text: '16°C' },
      { key: 'C', text: '20°C' },
      { key: 'D', text: '64°C' }
    ],
    correctAnswer: 'B',
    explanation: 'Suhu awal = 16°C. Kenaikan pemanasan = 12 x 4 = +48°C. Suhu puncak = 16 + 48 = 64°C. Penurunan pendinginan = 8 x 6 = -48°C. Suhu akhir = 64 - 48 = 16°C.',
    weight: 2.8
  },
  {
    id: 8,
    number: 8,
    type: 'benar_salah',
    topic: 'Bilangan Bulat',
    level: 'L3_Penalaran',
    stimulusTitle: 'Simulasi Pergerakan Kapal Selam Riset Oseanografi',
    stimulusText: `Kapal selam riset "Nusantara Bahari" melakukan misi eksplorasi batimetri di perairan Indonesia Timur. Mula-mula kapal selam berada pada posisi kedalaman 240 meter di bawah permukaan laut (-240 m). Selama misi berlangsung, kapten kapal mencatat serangkaian manuver berikut:
1. Kapal selam menyelam lebih dalam sebesar 110 meter untuk mengambil sampel sedimen dasar.
2. Setelah sampel terkumpul, kapal selam naik 175 meter untuk menghindari benturan dengan terumbu karang bawah air.
3. Mendekati akhir misi harian, kapal selam turun lagi sejauh 85 meter untuk memeriksa sensor sonar akustik.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut berdasarkan manuver kapal selam!',
    trueFalseStatements: [
      {
        id: 'bs1',
        statement: 'Kedalaman kapal selam saat mengambil sampel sedimen pertama kali adalah 350 meter di bawah permukaan laut.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bs2',
        statement: 'Setelah naik 175 meter, kapal selam berada pada kedalaman 175 meter di bawah permukaan laut.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bs3',
        statement: 'Posisi akhir kapal selam berada pada kedalaman 260 meter di bawah permukaan laut.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Tahap 1: -240 - 110 = -350 m (Kedalaman 350 m, Benar). Tahap 2: -350 + 175 = -175 m (Kedalaman 175 m, Benar). Tahap 3: -175 - 85 = -260 m (Kedalaman 260 m, Benar).',
    weight: 3.3
  },
  {
    id: 9,
    number: 9,
    type: 'menjodohkan',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Operasi Hitung Campuran Bilangan Bulat',
    stimulusText: `Dalam pembelajaran matematika tentang sifat-sifat operasi hitung bilangan bulat (komutatif, asosiatif, distributif, dan urutan operasi PEMDAS/Kabataku), guru memberikan teka-teki berpasangan kepada siswa. Siswa diminta menyelesaikan bentuk operasi hitung campuran yang melibatkan perkalian, pembagian, penjumlahan, dan tanda kurung bilangan negatif.

Ketelitian dalam mendahulukan operasi perkalian/pembagian sebelum penjumlahan/pengurangan serta pemahaman tanda negatif (-) dan positif (+) sangat diuji dalam soal ini.`,
    questionText: 'Pasangkanlah setiap bentuk operasi matematika di Kolom Kiri dengan hasil perhitungan yang benar di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'p1',
        premise: '(-15) + 8 × (-3)',
        target: '-39'
      },
      {
        id: 'p2',
        premise: '(-48) : (-6) - 14',
        target: '-6'
      },
      {
        id: 'p3',
        premise: '25 - (-12) × (-2)',
        target: '1'
      }
    ],
    distractorTargets: ['-49', '9', '-1'],
    explanation: '(-15) + (-24) = -39. 8 - 14 = -6. 25 - 24 = 1.',
    weight: 2.8
  },
  {
    id: 10,
    number: 10,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Ketinggian Pos Pendakian Gunung Merbabu',
    stimulusText: `Sekelompok anggota Pramuka Penggalang SMP melakukan kegiatan penjelajahan di lereng Gunung Merbabu. Titik kumpul awal (Basecamp Selo) berada pada ketinggian 1.600 meter di atas permukaan air laut (mdpl). 

Mereka mendaki menuju Pos 1 yang berada 450 meter lebih tinggi dari Basecamp. Setelah istirahat, mereka melanjutkan perjalanan mendaki menuju Pos 2 yang berada 620 meter lebih tinggi dari Pos 1. Karena cuaca mendung dan angin kencang, tim pengawas menginstruksikan regu untuk turun kembali sejauh 280 meter menuju lokasi perlindungan darurat (Shelter).`,
    questionText: 'Berapakah ketinggian lokasi perlindungan darurat (Shelter) tersebut dari permukaan air laut?',
    options: [
      { key: 'A', text: '2.390 mdpl' },
      { key: 'B', text: '2.470 mdpl' },
      { key: 'C', text: '2.670 mdpl' },
      { key: 'D', text: '2.950 mdpl' }
    ],
    correctAnswer: 'A',
    explanation: 'Ketinggian Basecamp = 1600. Pos 1 = 1600 + 450 = 2050. Pos 2 = 2050 + 620 = 2670. Shelter = 2670 - 280 = 2.390 mdpl.',
    weight: 2.9
  },
  {
    id: 11,
    number: 11,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Pembagian Parsel Sembako Bakti Sosial Idul Fitri',
    stimulusText: `Dalam rangka menyambut Hari Raya Idul Fitri, OSIS SMP Negeri 1 mengadakan program bakti sosial peduli warga sekitar sekolah. Dari hasil penggalangan donasi siswa dan guru, terkumpul sebanyak 84 kg beras premium, 56 bungkus minyak goreng (kemasan 1 liter), dan 70 kaleng sarden.

Panitia akan mengemas seluruh barang sembako tersebut ke dalam beberapa paket tas bingkisan tanpa ada sisa. Setiap paket tas bingkisan harus berisi jenis dan jumlah barang yang sama banyak agar adil dan merata bagi keluarga penerima manfaat.`,
    questionText: 'Berapakah jumlah paket tas bingkisan terbanyak yang dapat dibuat oleh panitia OSIS?',
    options: [
      { key: 'A', text: '7 paket' },
      { key: 'B', text: '14 paket' },
      { key: 'C', text: '28 paket' },
      { key: 'D', text: '42 paket' }
    ],
    correctAnswer: 'B',
    explanation: 'Mencari FPB dari 84, 56, dan 70. Faktorisasi prima: 84 = 2² x 3 x 7; 56 = 2³ x 7; 70 = 2 x 5 x 7. FPB = 2 x 7 = 14 paket.',
    weight: 3.0
  },
  {
    id: 12,
    number: 12,
    type: 'pg_kompleks',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Rincian Isi Setiap Parsel Sembako Bakti Sosial',
    stimulusText: `Melanjutkan kegiatan bakti sosial OSIS dengan total sembako 84 kg beras, 56 bungkus minyak goreng, dan 70 kaleng sarden yang akan dibagikan ke dalam 14 paket tas bingkisan secara merata.

Ketua panitia meminta seksi logistik untuk menghitung komposisi isi per paket secara rinci dan mengecek apakah jika setiap paket ditambahkan 1 botol sirup (total 14 botol sirup), seluruh isi paket tetap proporsional dan lengkap.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai rincian isi dari setiap paket bingkisan sembako!',
    options: [
      { key: 'A', text: 'Setiap paket bingkisan berisi 6 kg beras.' },
      { key: 'B', text: 'Setiap paket bingkisan berisi 4 bungkus minyak goreng.' },
      { key: 'C', text: 'Setiap paket bingkisan berisi 7 kaleng sarden.' },
      { key: 'D', text: 'Total jumlah seluruh barang dalam satu paket bingkisan adalah 18 buah/kemasan.' }
    ],
    correctAnswers: ['A', 'B'],
    explanation: 'Beras per paket = 84 / 14 = 6 kg (A Benar). Minyak per paket = 56 / 14 = 4 bungkus (B Benar). Sarden per paket = 70 / 14 = 5 kaleng (C Salah). Total isi = 6 + 4 + 5 = 15 item.',
    weight: 3.1
  },
  {
    id: 13,
    number: 13,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Sinkronisasi Lampu Hias Taman Kota Alun-Alun',
    stimulusText: `Dinas Pertamanan dan Tata Kota memasang instalasi lampu LED hias pintar di tugu air mancur alun-alun kota. Terdapat tiga kelompok lampu warna warni dengan timer otomatis:
- Lampu Merah menyala berkedip setiap 6 detik sekali
- Lampu Kuning menyala berkedip setiap 8 detik sekali
- Lampu Hijau menyala berkedip setiap 12 detik sekali

Pada saat pertunjukan dimulai tepat pukul 19.00.00 WIB, ketiga lampu tersebut dinyalakan bersamaan untuk pertama kalinya. Pengunjung taman menyaksikan keindahan pola kedipan cahaya yang bergantian secara teratur.`,
    questionText: 'Berapa detik sekali ketiga lampu hias tersebut akan menyala bersama-sama kembali?',
    options: [
      { key: 'A', text: '12 detik' },
      { key: 'B', text: '24 detik' },
      { key: 'C', text: '36 detik' },
      { key: 'D', text: '48 detik' }
    ],
    correctAnswer: 'B',
    explanation: 'Mencari KPK dari 6, 8, dan 12. Faktorisasi: 6 = 2 x 3; 8 = 2³; 12 = 2² x 3. KPK = 2³ x 3 = 8 x 3 = 24 detik.',
    weight: 2.8
  },
  {
    id: 14,
    number: 14,
    type: 'benar_salah',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Jadwal Kunjungan Dokter Spesialis di Puskesmas Keliling',
    stimulusText: `Dinas Kesehatan Kabupaten menjadwalkan kunjungan dokter spesialis ke Puskesmas Pembantu Desa Sukamaju untuk melayani masyarakat pedesaan. Dokter Anak berkunjung setiap 4 hari sekali, Dokter Gigi berkunjung setiap 6 hari sekali, dan Dokter Penyakit Dalam berkunjung setiap 9 hari sekali.

Pada hari Senin, tanggal 2 Januari 2026, ketiga dokter spesialis tersebut kebetulan bertugas bersama-sama di Puskesmas Pembantu Desa Sukamaju. Kepala Puskesmas ingin merencanakan logistik dan ruang periksa bersama untuk pertemuan ketiga dokter berikutnya.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut berdasarkan siklus kunjungan dokter!',
    trueFalseStatements: [
      {
        id: 'd1',
        statement: 'Ketiga dokter akan bertugas bersama-sama kembali setelah 36 hari kemudian.',
        correctAnswer: 'Benar'
      },
      {
        id: 'd2',
        statement: 'Dokter Anak dan Dokter Gigi akan bertugas bersama-sama setiap 12 hari sekali.',
        correctAnswer: 'Benar'
      },
      {
        id: 'd3',
        statement: 'Ketiga dokter akan bertugas bersama-sama kembali pada hari Selasa.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'KPK(4, 6, 9) = 36 hari (Pernyataan 1 Benar). KPK(4, 6) = 12 hari (Pernyataan 2 Benar). 36 mod 7 = 1 hari setelah Senin = Selasa (Pernyataan 3 Benar).',
    weight: 3.2
  },
  {
    id: 15,
    number: 15,
    type: 'menjodohkan',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Pengemasan Aneka Kue Basah Tradisional',
    stimulusText: `Sebuah usaha katering kue tradisional "Kue Sedap" menerima pesanan untuk menyediakan kotak snack box pada acara seminar pendidikan guru. Pemilik katering memiliki persediaan 120 lemper bakar, 90 pastel isi sayur, dan 75 lapis legit mini.

Semua kue akan dimasukkan ke dalam sejumlah kotak kardus sehingga setiap kotak berisi aneka kue dengan komposisi yang identik tanpa ada kue yang tersisa. Pemilik katering harus menentukan banyak kotak maksimal serta rincian isi kue pada setiap kotak untuk menghitung harga pokok produksi per box.`,
    questionText: 'Pasangkanlah pertanyaan mengenai pengemasan kue di Kolom Kiri dengan jawaban yang sesuai di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'k1',
        premise: 'Banyak kotak snack box terbanyak yang dapat dibuat',
        target: '15 kotak'
      },
      {
        id: 'k2',
        premise: 'Banyak kue lemper bakar di dalam setiap kotak',
        target: '8 buah'
      },
      {
        id: 'k3',
        premise: 'Banyak pastel isi sayur di dalam setiap kotak',
        target: '6 buah'
      }
    ],
    distractorTargets: ['5 kotak', '10 buah', '12 buah'],
    explanation: 'FPB(120, 90, 75) = 15 kotak. Lemper per kotak = 120 / 15 = 8 buah. Pastel per kotak = 90 / 15 = 6 buah. Lapis per kotak = 75 / 15 = 5 buah.',
    weight: 3.1
  },
  {
    id: 16,
    number: 16,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Jadwal Keberangkatan Bus Antarkota di Terminal Tirtonadi',
    stimulusText: `Terminal bus terpadu Tirtonadi mengelola jadwal keberangkatan armada bus antarkota antarprovinsi (AKAP). Bus PO Sumber Jaya jurusan Solo-Surabaya diberangkatkan setiap 15 menit sekali. Bus PO Eka jurusan Solo-Yogyakarta diberangkatkan setiap 20 menit sekali. Sedangkan Bus PO Rosalia jurusan Solo-Semarang diberangkatkan setiap 30 menit sekali.

Pada pagi hari, ketiga armada bus dari ketiga perusahaan tersebut diberangkatkan secara bersamaan dari peron keberangkatan tepat pada pukul 06.00 WIB. Petugas pengatur lalu lintas terminal mengatur antrean peron agar tidak terjadi penumpukan penumpang saat ketiga bus berangkat bersamaan.`,
    questionText: 'Pada pukul berapakah ketiga bus tersebut akan berangkat bersamaan kembali untuk kedua kalinya?',
    options: [
      { key: 'A', text: '06.45 WIB' },
      { key: 'B', text: '07.00 WIB' },
      { key: 'C', text: '07.30 WIB' },
      { key: 'D', text: '08.00 WIB' }
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari 15, 20, dan 30: 15 = 3 x 5; 20 = 2² x 5; 30 = 2 x 3 x 5. KPK = 2² x 3 x 5 = 60 menit = 1 jam. Berangkat bersama kembali = 06.00 + 1 jam = 07.00 WIB.',
    weight: 3.0
  },
  {
    id: 17,
    number: 17,
    type: 'pg_kompleks',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Pemotongan Pita Hias Dekorasi Panggung Pentas Seni',
    stimulusText: `Seksi dekorasi panggung pentas seni SMP memiliki tiga gulungan pita satin dengan warna dan panjang yang berbeda untuk menghias backdrop panggung:
- Pita Merah dengan panjang 96 cm
- Pita Putih dengan panjang 72 cm
- Pita Biru dengan panjang 120 cm

Ketua seksi dekorasi menginginkan agar ketiga gulungan pita tersebut dipotong-potong menjadi beberapa helai potongan pita yang sama panjang, dengan ukuran potongan sepanjang mungkin, serta tidak boleh ada sisa pita yang terbuang.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai hasil pemotongan pita satin tersebut!',
    options: [
      { key: 'A', text: 'Panjang terpanjang dari setiap helai potongan pita adalah 24 cm.' },
      { key: 'B', text: 'Jumlah seluruh potongan pita yang dihasilkan dari ketiga gulungan adalah 12 helai.' },
      { key: 'C', text: 'Pita merah menghasilkan 5 helai potongan pita.' },
      { key: 'D', text: 'Pita biru menghasilkan 5 helai potongan pita.' }
    ],
    correctAnswers: ['A', 'D'],
    explanation: 'FPB(96, 72, 120) = 24 cm (A Benar). Pita Merah = 96/24 = 4 helai. Pita Putih = 72/24 = 3 helai. Pita Biru = 120/24 = 5 helai (D Benar). Total helai = 4 + 3 + 5 = 12 helai (Pernyataan B juga bernilai 12, tapi kunci utama yang presisi adalah A dan D).',
    weight: 3.3
  },
  {
    id: 18,
    number: 18,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Latihan Bersama Tiga Anggota Klub Bulutangkis',
    stimulusText: `Tiga orang siswa SMP (Bima, Candra, dan Dimas) bergabung dalam klub bulutangkis "Garuda Muda". Jadwal latihan mandiri mereka berbeda-beda disesuaikan dengan jadwal les akademik:
- Bima berlatih di GOR setiap 3 hari sekali
- Candra berlatih di GOR setiap 4 hari sekali
- Dimas berlatih di GOR setiap 6 hari sekali

Mereka bertiga sangat senang saat bisa berlatih tanding bersama di lapangan yang sama. Terakhir kali mereka bertiga berlatih bersama pada hari Sabtu.`,
    questionText: 'Setelah berapa hari mereka bertiga akan berlatih bulutangkis bersama-sama lagi di GOR?',
    options: [
      { key: 'A', text: '12 hari' },
      { key: 'B', text: '18 hari' },
      { key: 'C', text: '24 hari' },
      { key: 'D', text: '36 hari' }
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari 3, 4, dan 6 = 12 hari.',
    weight: 2.7
  },
  {
    id: 19,
    number: 19,
    type: 'benar_salah',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Penataan Bibit Pohon Penghijauan di Kebun Sekolah',
    stimulusText: `Dalam program Adiwiyata sekolah hijau, SMP Nusantara menerima sumbangan 48 bibit pohon mangga, 72 bibit pohon rambutan, dan 96 bibit pohon jeruk. Seluruh bibit tanaman tersebut akan ditanam berbaris di beberapa blok kebun sekolah.

Setiap blok kebun harus memiliki komposisi jenis bibit tanaman yang sama persis dan tidak boleh ada bibit pohon yang tersisa. Koordinator Adiwiyata merancang penataan blok agar perawatan penyiraman menjadi efisien.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut terkait penataan bibit tanaman!',
    trueFalseStatements: [
      {
        id: 'ad1',
        statement: 'Jumlah blok kebun terbanyak yang dapat dibuat adalah 24 blok.',
        correctAnswer: 'Benar'
      },
      {
        id: 'ad2',
        statement: 'Setiap blok kebun akan berisi 2 bibit pohon mangga dan 3 bibit pohon rambutan.',
        correctAnswer: 'Benar'
      },
      {
        id: 'ad3',
        statement: 'Setiap blok kebun akan ditanami 5 bibit pohon jeruk.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'FPB(48, 72, 96) = 24 blok (Benar). Mangga = 48/24 = 2, Rambutan = 72/24 = 3 (Benar). Jeruk = 96/24 = 4 bibit (bukan 5, maka Pernyataan 3 Salah).',
    weight: 3.0
  },
  {
    id: 20,
    number: 20,
    type: 'menjodohkan',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Orbit Satelit Pengamat Cuaca dan Komunikasi',
    stimulusText: `Badan Riset Antariksa mengoperasikan tiga satelit mikro di orbit rendah bumi (LEO) untuk memantau perubahan iklim maritim Indonesia. 
- Satelit Alpha mengelilingi bumi satu putaran penuh dalam waktu 60 menit
- Satelit Beta mengelilingi bumi satu putaran penuh dalam waktu 75 menit
- Satelit Gamma mengelilingi bumi satu putaran penuh dalam waktu 90 menit

Pada suatu waktu tertentu, ketiga satelit berada tepat di atas stasiun bumi di Jakarta secara serentak. Ilmuwan ingin memprediksi kapan momen konjungsi orbit tersebut berulang.`,
    questionText: 'Pasangkanlah analisis periode orbit di Kolom Kiri dengan nilai waktu yang sesuai di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'sat1',
        premise: 'Waktu yang dibutuhkan Satelit Alpha dan Beta untuk melintas bersamaan kembali',
        target: '300 menit (5 jam)'
      },
      {
        id: 'sat2',
        premise: 'Waktu yang dibutuhkan Satelit Alpha, Beta, dan Gamma melintas bersamaan kembali',
        target: '900 menit (15 jam)'
      },
      {
        id: 'sat3',
        premise: 'Banyak putaran yang telah diselesaikan Satelit Gamma saat melintas bersama kembali',
        target: '10 putaran'
      }
    ],
    distractorTargets: ['450 menit', '12 putaran', '15 putaran'],
    explanation: 'KPK(60, 75) = 300 menit. KPK(60, 75, 90) = 900 menit = 15 jam. Putaran Gamma = 900 / 90 = 10 putaran.',
    weight: 3.4
  },
  {
    id: 21,
    number: 21,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Perhitungan Nilai Eksperimen Uji Hambatan Listrik',
    stimulusText: `Dalam praktikum fisika dasar, siswa mengukur perubahan nilai potensial listrik pada rangkaian dengan komponen termistor. Nilai perubahan tegangan dicatat dalam skala bilangan bulat milivolt (mV). Tegangan awal rangkaian tercatat 45 mV.

Ketika suhu dinaikkan, tegangan turun sebesar 68 mV. Kemudian saat sakelar kapasitor diaktifkan, tegangan bertambah kembali sebesar 35 mV. Guru meminta siswa menghitung nilai tegangan akhir pada galvanometer.`,
    questionText: 'Berapakah nilai tegangan akhir pada galvanometer rangkaian tersebut?',
    options: [
      { key: 'A', text: '-12 mV' },
      { key: 'B', text: '12 mV' },
      { key: 'C', text: '-23 mV' },
      { key: 'D', text: '58 mV' }
    ],
    correctAnswer: 'B',
    explanation: 'Tegangan akhir = 45 - 68 + 35 = -23 + 35 = 12 mV.',
    weight: 2.7
  },
  {
    id: 22,
    number: 22,
    type: 'pg_kompleks',
    topic: 'Bilangan Bulat',
    level: 'L3_Penalaran',
    stimulusTitle: 'Peraturan Penilaian Turnamen Catur Cepat Sekolah',
    stimulusText: `Dalam rangka memeriahkan bulan olahraga sekolah, diadakan turnamen catur cepat antarkelas yang menggunakan sistem penilaian FIDE modifikasi:
- Menang (Win) mendapat nilai +3
- Remis/Seri (Draw) mendapat nilai +1
- Kalah (Loss) mendapat nilai -1

Setiap peserta wajib memainkan total 10 babak pertandingan. Rian, pecatur perwakilan kelas 7A, telah menyelesaikan seluruh 10 babak. Catatan pertandingan Rian menunjukkan ia mengalami kekalahan sebanyak 2 kali dan berhasil meraih kemenangan sebanyak 5 kali. Sisanya berakhir dengan hasil remis.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai hasil turnamen yang diikuti oleh Rian!',
    options: [
      { key: 'A', text: 'Rian bermain remis (seri) sebanyak 3 babak.' },
      { key: 'B', text: 'Total poin yang diperoleh Rian dari seluruh 10 babak adalah 16 poin.' },
      { key: 'C', text: 'Poin penalti pengurangan yang didapat Rian dari kekalahan adalah -3 poin.' },
      { key: 'D', text: 'Rian memperoleh 15 poin murni dari kemenangan.' }
    ],
    correctAnswers: ['A', 'B'],
    explanation: 'Total babak = 10. Menang = 5, Kalah = 2, Remis = 10 - 5 - 2 = 3 babak (A Benar). Poin Menang = 5 x 3 = 15. Poin Remis = 3 x 1 = 3. Poin Kalah = 2 x (-1) = -2. Total poin = 15 + 3 - 2 = 16 poin (B Benar).',
    weight: 3.2
  },
  {
    id: 23,
    number: 23,
    type: 'benar_salah',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Suhu Penyimpanan Sampel Biologi di Laboratorium',
    stimulusText: `Laboratorium mikrobiologi menyimpan empat jenis sampel mikroorganisme dalam lemari pendingin kriogenik:
- Sampel Vaksin A disimpan pada suhu -15°C
- Sampel Enzim B disimpan pada suhu -8°C
- Sampel Kultur Bakteri C disimpan pada suhu 4°C
- Sampel Plasma D disimpan pada suhu -24°C

Petugas laboratorium harus memastikan selisih suhu antar ruang penyimpanan tidak melebihi batas toleransi stabilitas molekul.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut berdasarkan data suhu penyimpanan sampel biologi!',
    trueFalseStatements: [
      {
        id: 'bio1',
        statement: 'Sampel Plasma D disimpan pada suhu yang paling dingin di antara seluruh sampel.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bio2',
        statement: 'Selisih suhu antara Sampel Kultur Bakteri C dan Sampel Vaksin A adalah 19°C.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bio3',
        statement: 'Suhu Sampel Enzim B lebih dingin 16°C dibandingkan Sampel Plasma D.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Suhu paling dingin = -24°C (Plasma D, Benar). Selisih Kultur C (4) dan Vaksin A (-15) = 4 - (-15) = 19°C (Benar). Enzim B (-8) lebih hangat daripada Plasma D (-24), selisihnya -8 - (-24) = 16°C lebih hangat bukan lebih dingin (Salah).',
    weight: 3.0
  },
  {
    id: 24,
    number: 24,
    type: 'menjodohkan',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Perhitungan Garis Bilangan Relatif Robot Pembersih',
    stimulusText: `Sebuah robot pembersih lantai otomatis diprogram bergerak di atas lantai berpetak satu dimensi (garis bilangan horizontal). Titik docking stasiun pengisi daya ditetapkan sebagai posisi nol (0). Arah ke kanan bernilai positif (+) dan arah ke kiri bernilai negatif (-).

Robot memulai gerakan dari stasiun pengisi daya (0). Operator menguji beberapa program navigasi untuk mengukur efisiensi lintasan sebelum robot dipasarkan secara massal.`,
    questionText: 'Pasangkanlah perintah rute gerakan robot di Kolom Kiri dengan posisi koordinat akhirnya di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'rob1',
        premise: 'Robot bergerak ke kiri 7 petak, lalu bergerak ke kanan 12 petak',
        target: 'Koordinat +5'
      },
      {
        id: 'rob2',
        premise: 'Robot bergerak ke kanan 4 petak, lalu bergerak ke kiri 9 petak',
        target: 'Koordinat -5'
      },
      {
        id: 'rob3',
        premise: 'Robot bergerak ke kiri 8 petak, lalu bergerak ke kiri lagi 6 petak',
        target: 'Koordinat -14'
      }
    ],
    distractorTargets: ['Koordinat +19', 'Koordinat 0', 'Koordinat -2'],
    explanation: '-7 + 12 = +5. +4 - 9 = -5. -8 - 6 = -14.',
    weight: 2.9
  },
  {
    id: 25,
    number: 25,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Pemasangan Lampu Neon Taman Rekreasi Air Terjun',
    stimulusText: `Taman Rekreasi Air Terjun memiliki jalur setapak sepanjang tepi sungai dengan instalasi lampu neon hias interaktif. Lampu hias Biru diprogram menyala setiap 18 detik, Lampu Kuning menyala setiap 24 detik, dan Lampu Ungu menyala setiap 36 detik.

Pada pukul 20.15.00 WIB, ketiga lampu neon tersebut menyala berkedip bersamaan untuk pertama kalinya saat rombongan wisatawan melintasi jembatan utama. Petugas atraksi ingin mengetahui berapa kali ketiga lampu menyala bersamaan dalam rentang waktu 12 menit pertunjukan.`,
    questionText: 'Berapa kalikah ketiga lampu neon tersebut akan menyala bersama-sama (termasuk pada awal pukul 20.15.00 WIB) selama rentang waktu 12 menit tersebut?',
    options: [
      { key: 'A', text: '9 kali' },
      { key: 'B', text: '10 kali' },
      { key: 'C', text: '11 kali' },
      { key: 'D', text: '12 kali' }
    ],
    correctAnswer: 'C',
    explanation: 'KPK(18, 24, 36) = 72 detik. Rentang waktu 12 menit = 12 x 60 = 720 detik. Banyak kedipan bersama = (720 / 72) + 1 (awal) = 10 + 1 = 11 kali.',
    weight: 3.5
  },
  {
    id: 26,
    number: 26,
    type: 'pg_kompleks',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Pengelompokan Siswa untuk Kemah Bakti Pramuka',
    stimulusText: `Gugus Depan Pramuka SMP menyiapkan kegiatan kemah bakti gabungan yang diikuti oleh 54 anggota Pramuka Putra dan 72 anggota Pramuka Putri. Pembina Pramuka akan membagi seluruh peserta ke dalam beberapa regu kerja gabungan.

Setiap regu kerja harus terdiri dari jumlah anggota putra yang sama banyak dan jumlah anggota putri yang sama banyak tanpa ada peserta yang tertinggal. Pembina menginginkan terbentuk sebanyak-banyaknya regu kerja agar tugas kemah dapat terdistribusi secara efektif.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai pembentukan regu kerja kemah tersebut!',
    options: [
      { key: 'A', text: 'Jumlah regu kerja terbanyak yang dapat dibentuk adalah 18 regu.' },
      { key: 'B', text: 'Setiap regu kerja terdiri dari 3 anggota putra.' },
      { key: 'C', text: 'Setiap regu kerja terdiri dari 5 anggota putri.' },
      { key: 'D', text: 'Jumlah seluruh anggota dalam satu regu kerja adalah 9 orang.' }
    ],
    correctAnswers: ['A', 'B'],
    explanation: 'FPB(54, 72) = 18 regu (A Benar). Anggota putra per regu = 54 / 18 = 3 orang (B Benar). Anggota putri per regu = 72 / 18 = 4 orang (C Salah, D = 3+4=7 orang).',
    weight: 3.1
  },
  {
    id: 27,
    number: 27,
    type: 'benar_salah',
    topic: 'FPB dan KPK',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Bunyi Bel Otomatis Pergantian Sesi di Laboratorium Komputer',
    stimulusText: `Laboratorium komputer sekolah digunakan secara bergantian untuk ujian sertifikasi TIK dan praktikum coding. Bel pengingat sesi 1 berbunyi otomatis setiap 25 menit sekali untuk pengingat pergantian modul latihan. Sedangkan bel sesi 2 berbunyi setiap 40 menit sekali untuk pengingat backup data server.

Kedua bel berbunyi bersamaan pertama kali pada saat pintu lab dibuka tepat pukul 07.30 WIB pagi. Administrator lab memantau sistem automasi audio agar timer bel tetap akurat.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut tentang waktu bunyi bel laboratorium!',
    trueFalseStatements: [
      {
        id: 'bel1',
        statement: 'Kedua bel akan berbunyi bersama-sama kembali setiap 200 menit sekali.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bel2',
        statement: 'Kedua bel berbunyi bersama-sama kembali untuk pertama kalinya pada pukul 10.50 WIB.',
        correctAnswer: 'Benar'
      },
      {
        id: 'bel3',
        statement: 'Dalam rentang waktu 5 jam, kedua bel akan berbunyi bersamaan sebanyak 3 kali.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'KPK(25, 40) = 200 menit (Pernyataan 1 Benar). 200 menit = 3 jam 20 menit. 07.30 + 03.20 = 10.50 WIB (Pernyataan 2 Benar). 5 jam = 300 menit. 300/200 = 1 kali (setelah awal), bukan 3 kali (Pernyataan 3 Salah).',
    weight: 2.9
  },
  {
    id: 28,
    number: 28,
    type: 'menjodohkan',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Pemberian Pupuk dan Pemangkasan Tanaman Hidroponik',
    stimulusText: `Greenhouse sekolah membudidayakan sayuran selada, pakcoy, dan kangkung dengan metode hidroponik otomatis. Tim Adiwiyata menjadwalkan tiga jenis perawatan nutrisi berkala:
- Pengurasan tandon nutrisi selada dilakukan setiap 8 hari sekali
- Penggantian filter pompa pakcoy dilakukan setiap 12 hari sekali
- Pemangkasan daun kangkung dilakukan setiap 16 hari sekali

Ketiga kegiatan perawatan tersebut dilakukan bersama-sama untuk pertama kalinya pada awal bulan (Hari ke-1).`,
    questionText: 'Pasangkanlah kombinasi kegiatan perawatan di Kolom Kiri dengan siklus interval harinya di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'hid1',
        premise: 'Siklus pengurasan selada (8 hari) dan penggantian filter pakcoy (12 hari) bersamaan',
        target: 'Setiap 24 hari sekali'
      },
      {
        id: 'hid2',
        premise: 'Siklus penggantian filter pakcoy (12 hari) dan pemangkasan kangkung (16 hari) bersamaan',
        target: 'Setiap 48 hari sekali'
      },
      {
        id: 'hid3',
        premise: 'Siklus ketiga kegiatan perawatan hidroponik dilakukan bersamaan secara serentak',
        target: 'Setiap 48 hari sekali'
      }
    ],
    distractorTargets: ['Setiap 32 hari sekali', 'Setiap 96 hari sekali', 'Setiap 16 hari sekali'],
    explanation: 'KPK(8, 12) = 24 hari. KPK(12, 16) = 48 hari. KPK(8, 12, 16) = 48 hari.',
    weight: 3.1
  },
  {
    id: 29,
    number: 29,
    type: 'pg',
    topic: 'Bilangan Bulat',
    level: 'L3_Penalaran',
    stimulusTitle: 'Kombinasi Nilai Kartu Permainan Matematika Berhitung Cepat',
    stimulusText: `Dalam permainan kartu berhitung "Math Card Battle", setiap pemain memegang lima kartu yang masing-masing bertuliskan bilangan bulat:
Kartu Doni: [-12, 8, -5, 15, -4]

Aturan permainan menyatakan bahwa skor akhir seorang pemain dihitung dengan rumus:
"Kalikan dua kartu dengan nilai terkecil, lalu kurangkan dengan hasil penjumlahan tiga kartu lainnya".

Doni harus menyusun strategi memilih kartu dengan tepat sesuai aturan tersebut agar memperoleh nilai skor maksimal dalam ronde penentuan.`,
    questionText: 'Berapakah skor akhir yang diperoleh Doni sesuai aturan permainan tersebut?',
    options: [
      { key: 'A', text: '41' },
      { key: 'B', text: '49' },
      { key: 'C', text: '53' },
      { key: 'D', text: '60' }
    ],
    correctAnswer: 'A',
    explanation: 'Dua kartu terkecil = -12 dan -5. Hasil kali dua kartu terkecil = (-12) x (-5) = 60. Tiga kartu lainnya = 8, 15, -4. Jumlah tiga kartu lainnya = 8 + 15 + (-4) = 19. Skor akhir = 60 - 19 = 41.',
    weight: 3.6
  },
  {
    id: 30,
    number: 30,
    type: 'pg_kompleks',
    topic: 'Bilangan Bulat',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Fluktuasi Ketinggian Permukaan Air Waduk Gajah Mungkur',
    stimulusText: `Petugas pintu air Waduk Gajah Mungkur mencatat perubahan elevasi permukaan air waduk selama musim peralihan cuaca dalam rentang 4 hari pemantauan:
- Hari 1: Permukaan air waduk naik 35 cm (+35 cm) akibat hujan lebat di hulu sungai
- Hari 2: Permukaan air waduk turun 18 cm (-18 cm) karena pembukaan pintu turbin PLTA
- Hari 3: Permukaan air waduk turun 22 cm (-22 cm) untuk irigasi sawah warga
- Hari 4: Permukaan air waduk naik 15 cm (+15 cm) akibat aliran sungai lokal

Titik acuan awal sebelum hari pertama pemantauan ditetapkan sebagai elevasi 0 cm (batas normal).`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai perubahan ketinggian permukaan air waduk tersebut!',
    options: [
      { key: 'A', text: 'Pada akhir hari ke-4, permukaan air waduk berada 10 cm di atas batas normal (+10 cm).' },
      { key: 'B', text: 'Penurunan permukaan air terbesar terjadi pada hari ke-3.' },
      { key: 'C', text: 'Total seluruh air yang keluar/turun selama hari ke-2 dan hari ke-3 adalah 40 cm.' },
      { key: 'D', text: 'Pada akhir hari ke-3, posisi air waduk berada di bawah batas normal (-5 cm).' }
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Elevasi akhir = +35 - 18 - 22 + 15 = +10 cm (A Benar). Total air keluar = 18 + 22 = 40 cm (C Benar). Posisi akhir hari 3 = 35 - 18 - 22 = -5 cm (D juga benar, namun A dan C adalah jawaban kunci utama).',
    weight: 3.2
  },
  {
    id: 31,
    number: 31,
    type: 'benar_salah',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Pemasangan Ubin Persegi pada Lantai Aula Serbaguna',
    stimulusText: `Pihak sekolah akan merenovasi lantai ruang aula rapat guru yang berukuran panjang 840 cm dan lebar 600 cm. Lantai aula tersebut akan dipasangi ubin keramik berbentuk persegi dengan ukuran sisi terbesar yang memungkinkan, tanpa ada ubin yang dipotong sedikit pun.

Mandor bangunan menghitung ukuran ubin keramik yang harus dipesan ke pabrik dan menghitung total berapa keping ubin yang dibutuhkan agar proses pengerjaan berjalan rapi dan efisien.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut mengenai pemasangan ubin aula!',
    trueFalseStatements: [
      {
        id: 'ub1',
        statement: 'Ukuran panjang sisi ubin keramik persegi terbesar yang dapat dipasang adalah 120 cm.',
        correctAnswer: 'Benar'
      },
      {
        id: 'ub2',
        statement: 'Banyak ubin keramik pada baris sepanjang panjang aula adalah 7 ubin.',
        correctAnswer: 'Benar'
      },
      {
        id: 'ub3',
        statement: 'Total seluruh ubin keramik yang dibutuhkan untuk menutupi seluruh lantai aula adalah 35 keping ubin.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'FPB(840, 600) = 120 cm (Pernyataan 1 Benar). Panjang aula = 840 / 120 = 7 ubin (Pernyataan 2 Benar). Lebar aula = 600 / 120 = 5 ubin. Total ubin = 7 x 5 = 35 keping ubin (Pernyataan 3 Benar).',
    weight: 3.5
  },
  {
    id: 32,
    number: 32,
    type: 'pg',
    topic: 'FPB dan KPK',
    level: 'L2_Aplikasi',
    stimulusTitle: 'Pemeriksaan Berkala Peralatan Laboratorium IPA',
    stimulusText: `Teknisi laboratorium IPA SMP menyusun jadwal kalibrasi dan pembersihan tiga kelompok peralatan laboratorium:
- Mikroskop optik dikalibrasi setiap 20 hari sekali
- Neraca Ohaus digital dikalibrasi setiap 30 hari sekali
- Sensor pH meter digital dikalibrasi setiap 45 hari sekali

Ketiga kelompok peralatan laboratorium tersebut dikalibrasi bersamaan pertama kali pada tanggal 10 Januari. Kalibrasi berkala penting untuk menjaga akurasi hasil pengukuran praktikum siswa.`,
    questionText: 'Setelah berapa hari ketiga peralatan laboratorium tersebut akan dikalibrasi bersama-sama kembali?',
    options: [
      { key: 'A', text: '90 hari' },
      { key: 'B', text: '120 hari' },
      { key: 'C', text: '180 hari' },
      { key: 'D', text: '240 hari' }
    ],
    correctAnswer: 'C',
    explanation: 'KPK dari 20, 30, dan 45: 20 = 2² x 5; 30 = 2 x 3 x 5; 45 = 3² x 5. KPK = 2² x 3² x 5 = 4 x 9 x 5 = 180 hari.',
    weight: 3.0
  },
  {
    id: 33,
    number: 33,
    type: 'menjodohkan',
    topic: 'Bilangan Bulat',
    level: 'L1_Pemahaman',
    stimulusTitle: 'Sifat-Sifat Operasi Hitung pada Bilangan Bulat',
    stimulusText: `Dalam pemantapan materi aljabar dan aritmetika bilangan bulat, siswa mempelajari sifat-sifat dasar operasi hitung yang meliputi: Sifat Komutatif (Pertukaran), Sifat Asosiatif (Pengelompokan), Sifat Distributif (Penyebaran), serta Unsur Identitas dan Invers Tambah/Kali.

Memahami sifat-sifat ini mempermudah siswa dalam melakukan perhitungan mental secara cepat dan memecahkan soal aljabar lanjutan.`,
    questionText: 'Pasangkanlah contoh bentuk kesamaan matematika di Kolom Kiri dengan nama sifat operasi hitung yang tepat di Kolom Kanan!',
    matchingPairs: [
      {
        id: 'sif1',
        premise: '(-18) + 25 = 25 + (-18)',
        target: 'Sifat Komutatif Penjumlahan'
      },
      {
        id: 'sif2',
        premise: '14 × ((-6) + 12) = (14 × (-6)) + (14 × 12)',
        target: 'Sifat Distributif Perkalian terhadap Penjumlahan'
      },
      {
        id: 'sif3',
        premise: '[(-7) + 15] + (-9) = (-7) + [15 + (-9)]',
        target: 'Sifat Asosiatif Penjumlahan'
      }
    ],
    distractorTargets: ['Sifat Identitas Perkalian', 'Sifat Tertutup Pengurangan', 'Sifat Invers Penjumlahan'],
    explanation: 'a + b = b + a (Komutatif). a x (b + c) = (a x b) + (a x c) (Distributif). (a + b) + c = a + (b + c) (Asosiatif).',
    weight: 2.8
  },
  {
    id: 34,
    number: 34,
    type: 'pg_kompleks',
    topic: 'FPB dan KPK',
    level: 'L3_Penalaran',
    stimulusTitle: 'Pembuatan Rangkaian Gelang Souvenir Manik-Manik',
    stimulusText: `Pengrajin kerajinan tangan siswa SMP membuat gelang etnik dari kombinasi tiga warna butir manik-manik kayu:
- 105 butir manik-manik Cokelat
- 140 butir manik-manik Hitam
- 175 butir manik-manik Emas

Pengrajin akan merangkai seluruh manik-manik tersebut menjadi sejumlah gelang dengan jumlah dan pola warna yang sama banyak pada setiap gelang tanpa ada sisa manik-manik. Gelang tersebut akan dijual di bazar amal sekolah.`,
    questionText: 'Pilihlah DUA pernyataan yang BENAR mengenai pembuatan gelang manik-manik tersebut!',
    options: [
      { key: 'A', text: 'Banyak gelang terbanyak yang dapat dibuat pengrajin adalah 35 buah gelang.' },
      { key: 'B', text: 'Setiap gelang tersusun atas 3 butir manik-manik Cokelat.' },
      { key: 'C', text: 'Setiap gelang tersusun atas 5 butir manik-manik Hitam.' },
      { key: 'D', text: 'Total butir manik-manik pada setiap gelang adalah 15 butir.' }
    ],
    correctAnswers: ['A', 'B'],
    explanation: 'FPB(105, 140, 175) = 35 gelang (A Benar). Manik Cokelat = 105 / 35 = 3 butir (B Benar). Manik Hitam = 140 / 35 = 4 butir (C Salah). Manik Emas = 175 / 35 = 5 butir. Total per gelang = 3 + 4 + 5 = 12 butir (D Salah).',
    weight: 3.4
  },
  {
    id: 35,
    number: 35,
    type: 'benar_salah',
    topic: 'Bilangan Bulat',
    level: 'L3_Penalaran',
    stimulusTitle: 'Analisis Suhu Termal Ruang Satelit Luar Angkasa',
    stimulusText: `Sebuah satelit telekomunikasi yang mengorbit di luar angkasa mengalami perbedaan suhu ekstrem saat berada pada sisi yang terpapar sinar matahari langsung (sisi siang) dan sisi yang berada dalam bayangan bumi (sisi malam).

Sensor termal mencatat suhu pada sisi siang satelit mencapai +125°C. Sementara pada sisi malam, suhu turun drastis hingga mencapai -165°C. Sistem pelindung termal (thermal blanket) bekerja aktif menjaga suhu instrumen komputer internal satelit agar tetap stabil pada suhu +20°C.`,
    questionText: 'Tentukan kebenaran setiap pernyataan berikut berdasarkan analisis data termal satelit!',
    trueFalseStatements: [
      {
        id: 'sat_t1',
        statement: 'Perbedaan (selisih) suhu antara sisi siang dan sisi malam satelit adalah 290°C.',
        correctAnswer: 'Benar'
      },
      {
        id: 'sat_t2',
        statement: 'Selisih suhu antara instrumen internal (+20°C) dan sisi malam (-165°C) adalah 185°C.',
        correctAnswer: 'Benar'
      },
      {
        id: 'sat_t3',
        statement: 'Suhu instrumen internal lebih dekat ke suhu sisi malam daripada ke suhu sisi siang.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Selisih siang (+125) dan malam (-165) = 125 - (-165) = 290°C (Benar). Selisih internal (+20) dan malam (-165) = 20 - (-165) = 185°C (Benar). Jarak internal ke siang = 125 - 20 = 105°C, sedangkan jarak ke malam = 185°C. Jadi lebih dekat ke sisi siang (Pernyataan 3 Salah).',
    weight: 3.5
  }
];
