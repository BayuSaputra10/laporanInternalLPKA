/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

const GENSET_ITEMS = [
  { id: 1, name: "Periksa level coolant" },
  { id: 2, name: "Periksa level oli" },
  { id: 3, name: "Periksa level bahan bakar" },
  { id: 4, name: "Periksa level air accu" },
  { id: 5, name: "Periksa kondisi filter udara" },
  { id: 6, name: "Periksa kondisi filter oli" },
  { id: 7, name: "Periksa kondisi filter solar" },
  { id: 8, name: "Periksa kondisi selang & pipa" },
  { id: 9, name: "Periksa kondisi radiator" },
  { id: 10, name: "Periksa kondisi belt" },
  { id: 11, name: "Periksa kondisi kabel listrik" },
  { id: 12, name: "Periksa kebersihan mesin" },
  { id: 13, name: "Periksa kebersihan panel" }
]

type FormErrors = Record<string, string>

export default function CreateGensetReport() {

  const initialForm = {
    regu: "",
    tanggal: "",
    mesin: "",
    generator: "",
    shift: "",
    speed: "",
    oliPress: "",
    temp: "",
    volt: "",
    ampereR: "",
    ampereS: "",
    ampereT: "",
    hz: "",
    kw: "",
    ampere: "",
    solarLevelAwal: "",
    solarLevelAkhir: "",
    solarPemakaian: "",
    gantiOliMesin: "",
    gantiFilterOli: "",
    gantiFilterSolar: "",
    catatan: ""
  }

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [inspectionItems, setInspectionItems] = useState(GENSET_ITEMS)
  const [inspections, setInspections] = useState(
    GENSET_ITEMS.map(item => ({
      itemId: item.id,
      kondisi: "Normal",
      keterangan: ""
    }))
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadInspectionItems() {
      try {
        const res = await fetch("/api/inspection-items?type=genset")
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setInspectionItems(data)
          setInspections(data.map((item: any) => ({
            itemId: item.id,
            kondisi: "Normal",
            keterangan: ""
          })))
        }
      } catch (error) {
        console.error("Failed to load genset inspection items", error)
      }
    }
    loadInspectionItems()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ""
    }))
  }


  // 🔥 FIX: pakai itemId (bukan index)
  const handleInspectionChange = (
    itemId: number,
    field: string,
    value: string
  ) => {
    setInspections(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  const validate = () => {
    const newErrors: any = {}

    if (!form.regu) newErrors.regu = "Wajib diisi"
    if (!form.tanggal) newErrors.tanggal = "Wajib diisi"

    // Validasi numerik untuk field teknis
    const numericFields = ['speed', 'oliPress', 'temp', 'volt', 'hz', 'kw', 'ampere', 'solarLevelAwal', 'solarLevelAkhir', 'solarPemakaian', 'gantiOliMesin', 'gantiFilterOli', 'gantiFilterSolar']
    const formRecord = form as Record<string, any>
    numericFields.forEach(field => {
      if (formRecord[field] && isNaN(Number(formRecord[field]))) {
        newErrors[field] = "Harus berupa angka"
      }
    })

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Form belum lengkap atau tidak valid")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/reports/genset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          regu: form.regu,
          tanggal: form.tanggal,
          mesin: form.mesin,
          generator: form.generator,
          shift: form.shift,
          speed: form.speed ? Number(form.speed) : null,
          oliPress: form.oliPress ? Number(form.oliPress) : null,
          temp: form.temp ? Number(form.temp) : null,
          ampereR: form.ampereR ? Number(form.ampereR) : null,
          ampereS: form.ampereS ? Number(form.ampereS) : null,
          ampereT: form.ampereT ? Number(form.ampereT) : null,
          hz: form.hz ? Number(form.hz) : null,
          kw: form.kw ? Number(form.kw) : null,
          ampere: form.ampere ? Number(form.ampere) : null,
          solarLevelAwal: form.solarLevelAwal ? Number(form.solarLevelAwal) : null,
          solarLevelAkhir: form.solarLevelAkhir ? Number(form.solarLevelAkhir) : null,
          solarPemakaian: form.solarPemakaian ? Number(form.solarPemakaian) : null,
          gantiOliMesin: form.gantiOliMesin ? Number(form.gantiOliMesin) : null,
          gantiFilterOli: form.gantiFilterOli ? Number(form.gantiFilterOli) : null,
          gantiFilterSolar: form.gantiFilterSolar ? Number(form.gantiFilterSolar) : null,
          catatan: form.catatan,
          inspections
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }))
        toast.error(`Gagal menyimpan: ${errorData.error || res.statusText}`)
        console.error("API Error:", errorData)
        return
      }

      await res.json()
      toast.success("Laporan genset berhasil disimpan")

      setForm(initialForm)
      setInspections(
        inspectionItems.map(item => ({
          itemId: item.id,
          kondisi: "Normal",
          keterangan: ""
        }))
      )
      setErrors({})
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan laporan")
      console.error("Network error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 md:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Form Laporan Genset</h1>
              <p className="text-blue-100 mt-2">Isi semua data sesuai dengan kondisi genset</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              ← Kembali ke Dashboard
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

          {/* FORM UTAMA */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-300">Informasi Umum</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Regu <span className="text-red-500">*</span></label>
                <input
                  name="regu"
                  value={form.regu}
                  placeholder="Masukkan nama regu"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition"
                  onChange={handleChange}
                  required
                />
                {errors.regu && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.regu}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition"
                  onChange={handleChange}
                  required
                />
                {errors.tanggal && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.tanggal}</p>}
              </div>
            </div>
          </div>

          {/* DATA TEKNIS GENSET */}
          <div className="bg-linear-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-300">
            <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-orange-300">Data Teknis Mesin</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Speed (RPM)</label>
                <input
                  name="speed"
                  value={form.speed}
                  placeholder="Contoh: 1500"
                  className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-orange-500 transition"
                  onChange={handleChange}
                />
                {errors.speed && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.speed}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Oli Press (Bar)</label>
                <input
                  name="oliPress"
                  value={form.oliPress}
                  placeholder="Contoh: 2.5"
                  className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-orange-500 transition"
                  onChange={handleChange}
                />
                {errors.oliPress && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.oliPress}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Temperatur (°C)</label>
                <input
                  name="temp"
                  value={form.temp}
                  placeholder="Contoh: 75"
                  className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-orange-500 transition"
                  onChange={handleChange}
                />
                {errors.temp && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.temp}</p>}
              </div>
            </div>
          </div>

          {/* PARAMETER OPERASIONAL */}
          <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border-2 border-emerald-300">
            <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-emerald-300">Generator</h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Volt</label>
                <input
                  name="volt"
                  value={form.volt}
                  placeholder="Volt"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.volt && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.volt}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HZ</label>
                <input
                  name="hz"
                  value={form.hz}
                  placeholder="HZ"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.hz && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.hz}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">KW</label>
                <input
                  name="kw"
                  value={form.kw}
                  placeholder="KW"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.kw && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.kw}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ampere R</label>
                <input
                  name="ampereR"
                  value={form.ampereR}
                  placeholder="Ampere R"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.ampereR && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.ampereR}</p>}
              </div>              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ampere S</label>
                <input
                  name="ampereS"
                  value={form.ampereS}
                  placeholder="Ampere S"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.ampereS && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.ampereS}</p>}
              </div>              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ampere T</label>
                <input
                  name="ampereT"
                  value={form.ampereT}
                  placeholder="Ampere T"
                  className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-emerald-500 transition text-sm"
                  onChange={handleChange}
                />
                {errors.ampereT && <p className="text-red-500 text-xs mt-1 font-medium">⚠ {errors.ampereT}</p>}
              </div>
            </div>
          </div>



          {/* LEVEL SOLAR */}
          <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-400">
            <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-yellow-400">Level Solar / Bahan Bakar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-900">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Level Awal (%)</label>
                <input
                  name="solarLevelAwal"
                  value={form.solarLevelAwal}
                  placeholder="Contoh: 100"
                  className="w-full px-4 py-2 border-2 border-yellow-400 rounded-lg bg-white focus:outline-none focus:border-yellow-600 transition"
                  onChange={handleChange}
                />
                {errors.solarLevelAwal && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.solarLevelAwal}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Level Akhir (%)</label>
                <input
                  name="solarLevelAkhir"
                  value={form.solarLevelAkhir}
                  placeholder="Contoh: 75"
                  className="w-full px-4 py-2 border-2 border-yellow-400 rounded-lg bg-white focus:outline-none focus:border-yellow-600 transition"
                  onChange={handleChange}
                />
                {errors.solarLevelAkhir && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.solarLevelAkhir}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pemakaian (%)</label>
                <input
                  name="solarPemakaian"
                  value={form.solarPemakaian}
                  placeholder="Contoh: 25"
                  className="w-full px-4 py-2 border-2 border-yellow-400 rounded-lg bg-white focus:outline-none focus:border-yellow-600 transition"
                  onChange={handleChange}
                />
                {errors.solarPemakaian && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.solarPemakaian}</p>}
              </div>
            </div>
          </div>

          {/* JADWAL MAINTENANCE */}
          <div className="bg-linear-to-br from-pink-50 to-pink-100 p-6 rounded-lg border-2 border-pink-300">
            <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-pink-300">Jadwal Maintenance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-900">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ganti Oli Mesin (jam)</label>
                <input
                  name="gantiOliMesin"
                  value={form.gantiOliMesin}
                  placeholder="Contoh: 500"
                  className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg bg-white focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange}
                />
                {errors.gantiOliMesin && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.gantiOliMesin}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ganti Filter Oli (jam)</label>
                <input
                  name="gantiFilterOli"
                  value={form.gantiFilterOli}
                  placeholder="Contoh: 500"
                  className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg bg-white focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange}
                />
                {errors.gantiFilterOli && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.gantiFilterOli}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ganti Filter Solar (jam)</label>
                <input
                  name="gantiFilterSolar"
                  value={form.gantiFilterSolar}
                  placeholder="Contoh: 1000"
                  className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg bg-white focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange}
                />
                {errors.gantiFilterSolar && <p className="text-red-500 text-sm mt-1 font-medium">⚠ {errors.gantiFilterSolar}</p>}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan / Keterangan Tambahan</label>
            <textarea
              name="catatan"
              value={form.catatan}
              placeholder="Tuliskan catatan atau keterangan penting mengenai kondisi genset..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition resize-none"
              onChange={handleChange}
            />
          </div>

          {/* CHECKLIST */}
          <div className="bg-linear-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border-2 border-cyan-300">
            <h2 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-cyan-300">Pemeriksaan Item - Checklist</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {inspectionItems.map((item, index) => {
                const data = inspections.find(i => i.itemId === item.id)!

                return (
                  <div key={item.id} className="bg-white p-4 rounded-lg border border-cyan-200 hover:shadow-md transition">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 grow pt-0.5">
                        {item.name}
                      </span>
                    </div>

                    <div className="space-y-2 ml-9">
                      <select
                        value={data.kondisi}
                        onChange={(e) =>
                          handleInspectionChange(item.id, "kondisi", e.target.value)
                        }
                        className="w-full border-2 border-cyan-300 px-2 py-1 rounded text-sm focus:outline-none text-slate-900  focus:border-cyan-500"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Bocor">Bocor</option>
                        <option value="Buntu">Buntu</option>
                        <option value="Pecah">Pecah</option>
                        <option value="Kendur">Kendur</option>
                        <option value="Putus">Putus</option>
                        <option value="Kurang">Kurang</option>
                        <option value="Kotor">Kotor</option>
                        <option value="Panas">Panas</option>
                        <option value="Terbakar">Terbakar</option>
                        <option value="Rusak">Rusak</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Keterangan (opsional)"
                        value={data.keterangan}
                        onChange={(e) =>
                          handleInspectionChange(item.id, "keterangan", e.target.value)
                        }
                        className="w-full border-2 border-cyan-200 px-2 py-1 text-slate-900  rounded text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg text-lg"
          >
            {loading ? "Menyimpan laporan..." : "💾 Simpan Laporan Genset"}
          </button>

        </form>
      </div>
    </div>
  )
}