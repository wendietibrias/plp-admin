import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────
interface SchoolYear {
  id: string;
  name: string;
}

interface Lecture {
  id: string;
  nidn: string;
  name: string;
  email: string;
  studyProgramName: string;
}

interface Student {
  id: string;
  nim: string;
  name: string;
  studyProgramName: string;
}

interface AcademicAdvisorRecord {
  id: string;
  lectureId: string;
  studentId: string;
  schoolYearId: string;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────
const mockSchoolYears: SchoolYear[] = [
  { id: "sy-1", name: "2025/2026 Genap" },
  { id: "sy-2", name: "2026/2027 Ganjil" },
];

const mockLectures: Lecture[] = [
  {
    id: "lec-1",
    nidn: "0407038501",
    name: "Dr. Eko Prasetyo, M.T.",
    email: "eko.p@univ.ac.id",
    studyProgramName: "Informatika",
  },
  {
    id: "lec-2",
    nidn: "0412108902",
    name: "Rina Wijayanti, M.Cs.",
    email: "rina.w@univ.ac.id",
    studyProgramName: "Informatika",
  },
  {
    id: "lec-3",
    nidn: "0422058203",
    name: "Hendra Setiawan, Ph.D.",
    email: "hendra.s@univ.ac.id",
    studyProgramName: "Sistem Informasi",
  },
];

const mockStudents: Student[] = [
  {
    id: "std-1",
    nim: "2210115261",
    name: "Aldo Rivaldi",
    studyProgramName: "Informatika",
  },
  {
    id: "std-2",
    nim: "2210115262",
    name: "Budi Santoso",
    studyProgramName: "Informatika",
  },
  {
    id: "std-3",
    nim: "2210115263",
    name: "Citra Lestari",
    studyProgramName: "Informatika",
  },
  {
    id: "std-4",
    nim: "2210115264",
    name: "Dewi Anggraini",
    studyProgramName: "Sistem Informasi",
  },
  {
    id: "std-5",
    nim: "2210115265",
    name: "Eka Putra",
    studyProgramName: "Informatika",
  },
  {
    id: "std-6",
    nim: "2210115266",
    name: "Fahri Hamzah",
    studyProgramName: "Sistem Informasi",
  },
];

const initialAdvisorRecords: AcademicAdvisorRecord[] = [
  { id: "rec-1", lectureId: "lec-1", studentId: "std-1", schoolYearId: "sy-2" },
  { id: "rec-2", lectureId: "lec-1", studentId: "std-2", schoolYearId: "sy-2" },
  { id: "rec-3", lectureId: "lec-2", studentId: "std-3", schoolYearId: "sy-2" },
];

const AcademicAdvisor: React.FC = () => {
  // ─── STATES ────────────────────────────────────────────────────────────
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<string>("sy-2");
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [searchLectureQuery, setSearchLectureQuery] = useState<string>("");

  // State untuk pencarian di panel Mahasiswa (Transfer)
  const [searchAvailableStudent, setSearchAvailableStudent] =
    useState<string>("");
  const [searchAssignedStudent, setSearchAssignedStudent] =
    useState<string>("");

  // Replica DB State
  const [advisorRecords, setAdvisorRecords] = useState<AcademicAdvisorRecord[]>(
    initialAdvisorRecords,
  );
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  // Custom Toast State
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto close Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sinkronisasi data Mahasiswa Terpilih ketika Dosen atau Tahun Ajaran berubah
  useEffect(() => {
    if (selectedLecture) {
      const currentAssignedIds = advisorRecords
        .filter(
          (rec) =>
            rec.lectureId === selectedLecture.id &&
            rec.schoolYearId === selectedSchoolYear,
        )
        .map((rec) => rec.studentId);
      setTargetKeys(currentAssignedIds);
    } else {
      setTargetKeys([]);
    }
    setSearchAvailableStudent("");
    setSearchAssignedStudent("");
  }, [selectedLecture, selectedSchoolYear, advisorRecords]);

  // Hitung jumlah mahasiswa bimbingan secara realtime
  const getStudentCount = (lectureId: string) => {
    return advisorRecords.filter(
      (rec) =>
        rec.lectureId === lectureId && rec.schoolYearId === selectedSchoolYear,
    ).length;
  };

  // Filter List Dosen
  const filteredLectures = mockLectures.filter(
    (lec) =>
      lec.name.toLowerCase().includes(searchLectureQuery.toLowerCase()) ||
      lec.nidn.includes(searchLectureQuery),
  );

  // ─── TRANSFER LOGIC FUNCTIONS ──────────────────────────────────────────
  const availableStudents = mockStudents.filter(
    (student) => !targetKeys.includes(student.id),
  );
  const assignedStudents = mockStudents.filter((student) =>
    targetKeys.includes(student.id),
  );

  // Filter berdasarkan input pencarian masing-masing kolom mahasiswa
  const filteredAvailableStudents = availableStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchAvailableStudent.toLowerCase()) ||
      s.nim.includes(searchAvailableStudent),
  );

  const filteredAssignedStudents = assignedStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchAssignedStudent.toLowerCase()) ||
      s.nim.includes(searchAssignedStudent),
  );

  const moveToTarget = (id: string) => {
    setTargetKeys([...targetKeys, id]);
  };

  const removeFromTarget = (id: string) => {
    setTargetKeys(targetKeys.filter((key) => key !== id));
  };

  const moveAllToTarget = () => {
    const allAvailableIds = filteredAvailableStudents.map((s) => s.id);
    setTargetKeys([...targetKeys, ...allAvailableIds]);
  };

  const removeAllFromTarget = () => {
    const assignedFilteredIds = filteredAssignedStudents.map((s) => s.id);
    setTargetKeys(
      targetKeys.filter((key) => !assignedFilteredIds.includes(key)),
    );
  };

  // Eksekusi Simpan Plotting ke State
  const handleSavePlotting = () => {
    if (!selectedLecture) {
      setToast({
        type: "error",
        message: "Silahkan pilih Dosen Wali terlebih dahulu!",
      });
      return;
    }

    setLoadingSave(true);

    setTimeout(() => {
      const cleanRecords = advisorRecords.filter(
        (rec) =>
          !(
            rec.lectureId === selectedLecture.id &&
            rec.schoolYearId === selectedSchoolYear
          ),
      );

      const newRecords: AcademicAdvisorRecord[] = targetKeys.map(
        (studentId, index) => ({
          id: `rec-new-${Date.now()}-${index}`,
          lectureId: selectedLecture.id,
          studentId: studentId,
          schoolYearId: selectedSchoolYear,
        }),
      );

      setAdvisorRecords([...cleanRecords, ...newRecords]);
      setLoadingSave(false);
      setToast({
        type: "success",
        message: `Berhasil memperbarui bimbingan akademik untuk ${selectedLecture.name}`,
      });
    }, 800);
  };

  return (
    <main className="p-8 pb-10 min-h-screen bg-gray-50 relative">
      {/* ─── CUSTOM TOAST ALERTS ─── */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-lg border text-sm max-w-md transition-all duration-300 animate-bounce ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <span className="mr-2 font-bold">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          <p>{toast.message}</p>
        </div>
      )}

      {/* ─── HEADER CONTENT ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Plotting Dosen Pembimbing Akademik
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kelola pemetaan relasi bimbingan KRS antara Mahasiswa dan Dosen Wali
            per Periode Akademik.
          </p>
        </div>

        {/* Kontrol Pemilihan Tahun Ajaran */}
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Tahun Ajaran Aktif
          </label>
          <div className="relative">
            <select
              className="w-full md:w-64 pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              value={selectedSchoolYear}
              onChange={(e) => {
                setSelectedSchoolYear(e.target.value);
                setSelectedLecture(null);
              }}
            >
              {mockSchoolYears.map((sy) => (
                <option key={sy.id} value={sy.id}>
                  {sy.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {/* Icon Book/Chevron */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN WORKSPACE GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI: MASTER DOSEN */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm h-[680px] flex flex-col overflow-hidden">
          {/* Card Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Daftar Dosen Wali
            </h3>
          </div>

          {/* Input Pencarian Dosen */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari Dosen berdasarkan Nama / NIDN..."
                className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchLectureQuery}
                onChange={(e) => setSearchLectureQuery(e.target.value)}
              />
              {searchLectureQuery && (
                <button
                  onClick={() => setSearchLectureQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* List Dosen */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-gray-50/30">
            {filteredLectures.length > 0 ? (
              filteredLectures.map((item) => {
                const isSelected = selectedLecture?.id === item.id;
                const studentCount = getStudentCount(item.id);

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-200 shadow-sm ring-1 ring-blue-400/20"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedLecture(item)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar Mimic */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <h4
                          className={`text-sm font-semibold truncate ${isSelected ? "text-blue-900" : "text-gray-900"}`}
                        >
                          {item.name}
                        </h4>
                        <div className="text-xs text-gray-500 space-y-0.5 mt-0.5">
                          <div>
                            NIDN: <span className="font-mono">{item.nidn}</span>
                          </div>
                          <div className="text-gray-400 text-[11px]">
                            {item.studyProgramName}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Realtime Student Badge */}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        studentCount > 0
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {studentCount} Mhs
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-sm text-gray-400">
                Dosen tidak ditemukan
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: WORKSPACE ASSIGNMENT (CUSTOM DUAL-PANE TRANSFER COMPONENT) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm h-[680px] flex flex-col overflow-hidden">
          {/* Header Workspace */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                {selectedLecture ? (
                  <span>
                    Konfigurasi Bimbingan:{" "}
                    <span className="text-blue-600">
                      {selectedLecture.name}
                    </span>
                  </span>
                ) : (
                  "Alokasi Mahasiswa Bimbingan"
                )}
              </h3>
            </div>
            {selectedLecture && (
              <button
                onClick={handleSavePlotting}
                disabled={loadingSave}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
              >
                {loadingSave ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 002-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                )}
                {loadingSave ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            )}
          </div>

          {/* Konten Workspace */}
          {selectedLecture ? (
            <div className="flex-1 flex flex-col p-4 overflow-hidden justify-between">
              {/* Alert Tips */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs flex items-start gap-2 mb-4 shrink-0">
                <span className="text-base leading-none">💡</span>
                <div>
                  <strong>Cara Penggunaan:</strong> Klik tombol panah{" "}
                  <span className="font-bold">→</span> pada mahasiswa di kolom
                  kiri untuk memasukkan ke daftar bimbingan aktif dosen ini.
                  Klik tombol <span className="font-bold">←</span> di kolom
                  kanan untuk membatalkan/mengeluarkan. Jangan lupa klik{" "}
                  <strong>Simpan Perubahan</strong>.
                </div>
              </div>

              {/* PANEL DUAL-LIST TRANSFER (TAILWIND REPLACEMENT FOR ANTD TRANSFER) */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden min-h-0">
                {/* 1. KOLOM KIRI: MAHASISWA TERSEDIA */}
                <div className="border border-gray-200 rounded-xl flex flex-col overflow-hidden bg-white">
                  {/* Title Bar */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
                    <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">
                      Daftar Mahasiswa Tersedia (
                      {filteredAvailableStudents.length})
                    </span>
                    <button
                      onClick={moveAllToTarget}
                      disabled={filteredAvailableStudents.length === 0}
                      className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400 font-semibold transition-colors"
                    >
                      Pindahkan Semua »
                    </button>
                  </div>
                  {/* Search Bar */}
                  <div className="p-2 border-b border-gray-100 bg-gray-50/50 shrink-0">
                    <input
                      type="text"
                      placeholder="Cari NIM atau Nama..."
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchAvailableStudent}
                      onChange={(e) =>
                        setSearchAvailableStudent(e.target.value)
                      }
                    />
                  </div>
                  {/* Student Items List */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-gray-50/20">
                    {filteredAvailableStudents.length > 0 ? (
                      filteredAvailableStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors text-xs group"
                        >
                          <div>
                            <div className="font-semibold text-gray-800">
                              {student.name}
                            </div>
                            <div className="text-gray-400 font-mono text-[10px] mt-0.5">
                              {student.nim} • {student.studyProgramName}
                            </div>
                          </div>
                          <button
                            onClick={() => moveToTarget(student.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                            title="Tambahkan Ke Dosen"
                          >
                            <svg
                              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 text-gray-400 text-xs">
                        Tidak ada mahasiswa tersedia
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. KOLOM KANAN: MAHASISWA BIMBINGAN AKTIF */}
                <div className="border border-gray-200 rounded-xl flex flex-col overflow-hidden bg-white">
                  {/* Title Bar */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
                    <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">
                      Mahasiswa Bimbingan Aktif (
                      {filteredAssignedStudents.length})
                    </span>
                    <button
                      onClick={removeAllFromTarget}
                      disabled={filteredAssignedStudents.length === 0}
                      className="text-xs text-rose-600 hover:text-rose-800 disabled:text-gray-400 font-semibold transition-colors"
                    >
                      « Hapus Semua
                    </button>
                  </div>
                  {/* Search Bar */}
                  <div className="p-2 border-b border-gray-100 bg-gray-50/50 shrink-0">
                    <input
                      type="text"
                      placeholder="Cari NIM atau Nama..."
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchAssignedStudent}
                      onChange={(e) => setSearchAssignedStudent(e.target.value)}
                    />
                  </div>
                  {/* Student Items List */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-gray-50/20">
                    {filteredAssignedStudents.length > 0 ? (
                      filteredAssignedStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-2 bg-blue-50/30 border border-blue-100 rounded-lg hover:bg-rose-50/40 hover:border-rose-200 transition-colors text-xs group"
                        >
                          <div>
                            <div className="font-semibold text-blue-900">
                              {student.name}
                            </div>
                            <div className="text-gray-400 font-mono text-[10px] mt-0.5">
                              {student.nim} • {student.studyProgramName}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromTarget(student.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                            title="Keluarkan"
                          >
                            <svg
                              className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 text-gray-400 text-xs">
                        Belum ada mahasiswa yang dialokasikan
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State Workspace (Belum Pilih Dosen) */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/30">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-gray-700">
                Dosen Wali Belum Dipilih
              </h4>
              <p className="max-w-xs text-xs text-gray-400 mt-1 leading-relaxed">
                Silahkan cari dan pilih salah satu dosen wali di panel sebelah
                kiri terlebih dahulu untuk mengonfigurasi bimbingan akademik
                mahasiswa.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AcademicAdvisor;
