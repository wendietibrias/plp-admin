import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Form, Layout, message } from "antd";
import {
  HomeOutlined,
  ClockCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  DayOfWeek,
  ScheduleStatus,
  type ClassScheduleTableItem,
  initialTableData,
} from "./ClassSchedule";

const { Title, Text } = Typography;
const { Content } = Layout;

const EditClassSchedule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockCourses = [
    { value: 101, label: "Pemrograman Web Lanjut" },
    { value: 102, label: "Keamanan Jaringan & Kriptografi" },
    { value: 103, label: "Pengembangan Kontrak Pintar Blockchain" },
  ];

  const mockSemesters = [
    { value: 1, label: "2025/2026 - Genap" },
    { value: 2, label: "2026/2027 - Ganjil" },
  ];

  const mockLecturers = [
    { value: 1, label: "Dr. Eko Prasetyo, M.T." },
    { value: 2, label: "Rina Wijayanti, M.Cs." },
  ];

  const mockClasses = [
    { value: 11, label: "IF-4A" },
    { value: 12, label: "IF-4B" },
  ];

  // Efek untuk memuat data lama berdasarkan 'key' parameter URL
  useEffect(() => {
    const saved = localStorage.getItem("class_schedules");
    const schedules: ClassScheduleTableItem[] = saved
      ? JSON.parse(saved)
      : initialTableData;

    const currentSchedule = schedules.find((item) => item.id === id);

    if (currentSchedule) {
      form.setFieldsValue({
        courseId: currentSchedule.courseId,
        classId: currentSchedule.classId,
        semesterId: currentSchedule.semesterId,
        lecturerId: currentSchedule.lecturerId,
        day: currentSchedule.day,
        startTime: currentSchedule.startTime,
        endTime: currentSchedule.endTime,
        room: currentSchedule.room,
        totalMeetings: currentSchedule.totalMeetings,
        status: currentSchedule.status,
        notes: currentSchedule.notes,
      });
    } else {
      message.error("Jadwal perkuliahan tidak ditemukan!");
      navigate("/class-schedules"); // Redirect kembali ke halaman list jika ID salah
    }
  }, [id, form, navigate]);

  const classScheduleFormFields: FormFieldComponent[] = [
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "courseId",
        label: "Mata Kuliah",
        rules: [{ required: true, message: "Mata kuliah wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Mata Kuliah",
        className: "h-10",
        options: mockCourses,
        showSearch: true,
        optionFilterProp: "label",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "classId",
        label: "Kelas",
        rules: [{ required: true, message: "Kelas wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Kelas",
        className: "h-10",
        options: mockClasses,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "semesterId",
        label: "Semester",
        rules: [{ required: true, message: "Semester wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Semester",
        className: "h-10",
        options: mockSemesters,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "lecturerId",
        label: "Dosen Pengampu",
        rules: [{ required: true, message: "Dosen pengampu wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Dosen Pengampu",
        className: "h-10",
        options: mockLecturers,
        showSearch: true,
        optionFilterProp: "label",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "day",
        label: "Hari Kuliah",
        rules: [{ required: true, message: "Hari kuliah wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Hari",
        className: "h-10",
        options: [
          { value: DayOfWeek.MONDAY, label: "Senin" },
          { value: DayOfWeek.TUESDAY, label: "Selasa" },
          { value: DayOfWeek.WEDNESDAY, label: "Rabu" },
          { value: DayOfWeek.THURSDAY, label: "Kamis" },
          { value: DayOfWeek.FRIDAY, label: "Jumat" },
          { value: DayOfWeek.SATURDAY, label: "Sabtu" },
          { value: DayOfWeek.SUNDAY, label: "Minggu" },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "startTime",
        label: "Jam Mulai (Start Time)",
        rules: [
          { required: true, message: "Jam mulai wajib diisi!" },
          {
            pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
            message: "Format jam salah (HH:mm)",
          },
        ],
      },
      inputProps: {
        placeholder: "Contoh: 08:00",
        className: "h-10",
        prefix: <ClockCircleOutlined className="text-[#98a2b3]" />,
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "endTime",
        label: "Jam Selesai (End Time)",
        rules: [
          { required: true, message: "Jam selesai wajib diisi!" },
          {
            pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
            message: "Format jam salah (HH:mm)",
          },
        ],
      },
      inputProps: {
        placeholder: "Contoh: 10:30",
        className: "h-10",
        prefix: <ClockCircleOutlined className="text-[#98a2b3]" />,
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "room",
        label: "Ruangan Kelas",
        rules: [{ required: true, message: "Nama ruangan wajib diisi!" }],
      },
      inputProps: {
        placeholder: "Contoh: Lab Blockchain, R.3.2",
        className: "h-10",
        prefix: <HomeOutlined className="text-[#98a2b3]" />,
      },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "totalMeetings",
        label: "Jumlah Pertemuan",
        rules: [
          { required: true, message: "Jumlah pertemuan wajib diisi!" },
          { type: "number", message: "Harus berupa angka" },
        ],
      },
      inputNumberProps: {
        placeholder: "Contoh: 16",
        min: 1,
        max: 32,
        className: "w-full h-10 flex items-center",
        prefix: <NumberOutlined className="text-[#98a2b3]" />,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "status",
        label: "Status Operasional",
        rules: [{ required: true, message: "Status wajib diisi!" }],
      },
      selectProps: {
        placeholder: "Pilih Status",
        className: "h-10",
        options: [
          { value: ScheduleStatus.ACTIVE, label: "Active" },
          { value: ScheduleStatus.CANCELLED, label: "Cancelled" },
          { value: ScheduleStatus.COMPLETED, label: "Completed" },
        ],
      },
    },
    {
      type: InputType.TEXT_AREA,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "notes",
        label: "Catatan Tambahan (Opsional)",
      },
      textAreaProps: {
        placeholder: "Masukkan instruksi atau info tambahan perkuliahan...",
        rows: 3,
      },
    },
  ];

  const renderFormSuffix = () => <div></div>;

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Ambil data state storage saat ini
      const saved = localStorage.getItem("class_schedules");
      const schedules: ClassScheduleTableItem[] = saved
        ? JSON.parse(saved)
        : initialTableData;

      // Map & perbarui item yang memiliki key yang cocok
      const updatedSchedules = schedules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            courseId: Number(values.courseId),
            classId: Number(values.classId),
            semesterId: Number(values.semesterId),
            lecturerId: Number(values.lecturerId),
            day: values.day,
            startTime: values.startTime,
            endTime: values.endTime,
            room: values.room,
            totalMeetings: Number(values.totalMeetings),
            status: values.status,
            notes: values.notes || null,
          };
        }
        return item;
      });

      // Simpan kembali hasil mutasi data ke localStorage
      localStorage.setItem("class_schedules", JSON.stringify(updatedSchedules));

      message.success("Jadwal perkuliahan berhasil diperbarui!");

      setTimeout(() => {
        setLoading(false);
        navigate("/class-schedules");
      }, 800);
    } catch (error) {
      console.error("Validasi gagal atau error update:", error);
      setLoading(false);
    }
  };

  return (
    <Content className="p-8 pb-10">
      {/* Header Title */}
      <div className="mb-6">
        <Title level={2} className="m-0! font-bold! text-2xl! text-[#101828]!">
          Edit Jadwal Kuliah
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Ubah detail alokasi waktu perkuliahan, ruangan, atau sesuaikan status
          operasional kelas aktif.
        </Text>
      </div>

      <FormPageComponent
        formFields={classScheduleFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={renderFormSuffix()}
        formProps={{ form }}
      />
    </Content>
  );
};

export default EditClassSchedule;
