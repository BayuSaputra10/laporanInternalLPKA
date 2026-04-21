"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  regu: string
  tanggal: string
  waktuPemakaianJam: number | null
  hourMeterAwal: number | null
  hourMeterAkhir: number | null
  solarLevelAwal: number | null
  solarLevelAkhir: number | null
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateGensetReport() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    regu: '',
    tanggal: '',
    waktuPemakaianJam: null,
    hourMeterAwal: null,
    hourMeterAkhir: null,
    solarLevelAwal: null,
    solarLevelAkhir: null,
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lpka-green/50 focus:border-lpka-green shadow-sm hover:shadow-md transition-all md:px-6 md:py-4'

  const labelClass = 'block text-sm font-semibold text-gray-800 mb-2 md:text-base md:mb-3'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'photo') {
      const file = files?.[0] || null
      if (file && !file.type.startsWith('image/')) {
        toast.error('❌ Hanya file foto yang diizinkan (jpg, png, gif, etc.)')
        return
      }
      setForm(prev => ({ ...prev, photo: file }))
      setErrors(prev => ({ ...prev, photo: '' }))
      return
    }

    const numericFields = [
      'waktuPemakaianJam',
      'hourMeterAwal',
      'hourMeterAkhir',
      'solarLevelAwal',
      'solarLevelAkhir'
    ]

    if (numericFields.includes(name)) {
      const num = value === '' ? null : Number(value)
      setForm(prev => ({
        ...prev,
        [name]: isNaN(num!) ? null : num
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }

    setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}

    if (!form.regu.trim()) newErrors.regu = 'Regu wajib diisi'
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'

    if (!form.waktuPemakaianJam || form.waktuPemakaianJam <= 0)
      newErrors.waktuPemakaianJam = 'Harus lebih dari 0 jam'

    if (form.hourMeterAwal == null || form.hourMeterAwal < 0)
      newErrors.hourMeterAwal = 'Hour meter awal tidak valid'

    if (
      form.hourMeterAkhir == null ||
      form.hourMeterAwal == null ||
      form.hourMeterAkhir <= form.hourMeterAwal
    )
      newErrors.hourMeterAkhir = 'Hour meter akhir harus > awal'

    if (
      form.solarLevelAwal == null ||
      form.solarLevelAwal < 0 ||
      form.solarLevelAwal > 100
    )
      newErrors.solarLevelAwal = 'Solar awal 0-100%'

    if (
      form.solarLevelAkhir == null ||
      form.solarLevelAkhir < 0 ||
      form.solarLevelAkhir > 100
    )
      newErrors.solarLevelAkhir = 'Solar akhir 0-100%'

    if (
      form.solarLevelAwal != null &&
      form.solarLevelAkhir != null &&
      form.solarLevelAkhir > form.solarLevelAwal
    )
      newErrors.solarLevelAkhir = 'Solar akhir ≤ awal'

    if (!form.photo) {
      newErrors.photo = 'Foto wajib diupload'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('⚠️ Mohon lengkapi data yang kurang')
      return
    }

    setSubmitting(true)

    try {
      const solarPemakaian =
        (form.solarLevelAwal ?? 0) - (form.solarLevelAkhir ?? 0)

      const formData = new FormData()
      formData.append('regu', form.regu)
      formData.append('tanggal', form.tanggal)
      formData.append('waktuPemakaianJam', String(form.waktuPemakaianJam!))
      formData.append('hourMeterAwal', String(form.hourMeterAwal!))
      formData.append('hourMeterAkhir', String(form.hourMeterAkhir!))
      formData.append('solarLevelAwal', String(form.solarLevelAwal!))
      formData.append('solarLevelAkhir', String(form.solarLevelAkhir!))
      formData.append('solarPemakaian', String(solarPemakaian))

      if (form.photo) formData.append('photo', form.photo)

      const res = await fetch('/api/reports/genset', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('✅ Laporan genset berhasil dibuat!')
        router.push('/')
      } else {
        toast.error(data.message || '❌ Gagal membuat laporan genset')
      }
    } catch (error) {
      toast.error('❌ Kesalahan jaringan')
    } finally {
      setSubmitting(false)
    }
  }

  const solarPreview =
    form.solarLevelAwal != null && form.solarLevelAkhir != null
      ? form.solarLevelAwal - form.solarLevelAkhir
      : null

  return (
    <div className=''>
      <div className='fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(120,200,255,0.2),transparent),radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent)] pointer-events-none animate-pulse' />
      <div className='relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8'>
        <div className='w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mx-auto'>

          {/* HEADER */}
          <div className='bg-gradient-to-r from-lpka-green/95 to-green-700 p-6 sm:p-8 text-white'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'>📋 Laporan Genset</h1>
            <p className='text-green-100 text-sm sm:text-base md:text-lg mt-2 opacity-90'>Input data operasional harian</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className='p-6 sm:p-8 md:p-10 space-y-6 md:space-y-8'>

            {/* BASIC */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>Regu *</label>
                <input name='regu' value={form.regu} onChange={handleChange} className={inputClass} />
                {errors.regu && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.regu}</p>}
              </div>

              <div>
                <label className={labelClass}>Tanggal *</label>
                <input type='date' name='tanggal' value={form.tanggal} onChange={handleChange} className={inputClass} />
                {errors.tanggal && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.tanggal}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Waktu Pemakaian (Jam) *</label>
              <input type='number' name='waktuPemakaianJam' value={form.waktuPemakaianJam ?? ''} onChange={handleChange} className={inputClass} />
              {errors.waktuPemakaianJam && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.waktuPemakaianJam}</p>}
            </div>

            {/* HOUR METER */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>HM Awal *</label>
                <input type='number' name='hourMeterAwal' value={form.hourMeterAwal ?? ''} onChange={handleChange} className={inputClass} />
                {errors.hourMeterAwal && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.hourMeterAwal}</p>}
              </div>

              <div>
                <label className={labelClass}>HM Akhir *</label>
                <input type='number' name='hourMeterAkhir' value={form.hourMeterAkhir ?? ''} onChange={handleChange} className={inputClass} />
                {errors.hourMeterAkhir && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.hourMeterAkhir}</p>}
              </div>
            </div>

            {/* SOLAR */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>Solar Awal (%) *</label>
                <input type='number' name='solarLevelAwal' value={form.solarLevelAwal ?? ''} onChange={handleChange} className={inputClass} />
                {errors.solarLevelAwal && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.solarLevelAwal}</p>}
              </div>

              <div>
                <label className={labelClass}>Solar Akhir (%) *</label>
                <input type='number' name='solarLevelAkhir' value={form.solarLevelAkhir ?? ''} onChange={handleChange} className={inputClass} />
                {errors.solarLevelAkhir && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.solarLevelAkhir}</p>}
              </div>
            </div>

            {solarPreview != null && (
              <div className='p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 text-sm sm:text-base md:text-lg font-semibold shadow-lg border border-green-200'>
                Pemakaian Solar: <span className='text-xl sm:text-2xl md:text-3xl font-black'>{solarPreview}%</span>
              </div>
            )}

            {/* FILE */}
            <div>
              <label className={labelClass}>Upload Foto *</label>
              <input type='file' name='photo' accept='image/*' onChange={handleChange} className="w-full mt-2 p-3 border-2 border-dashed border-lpka-green/30 rounded-xl bg-lpka-green/5 text-sm sm:text-base file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-xl file:border-0 file:font-semibold file:bg-lpka-green file:text-white hover:file:bg-lpka-green/90 hover:border-lpka-green/50 transition-all cursor-pointer" />
              {errors.photo && <p className='text-red-500 text-xs sm:text-sm mt-2 font-medium'>{errors.photo}</p>}
            </div>

            {/* BUTTON */}
            <button
              disabled={submitting}
              className='w-full bg-gradient-to-r from-lpka-green to-green-600 hover:from-lpka-green/90 hover:to-green-600/90 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-lpka-green/50'
            >
              {submitting ? 'Menyimpan Laporan...' : '🔋 Simpan Laporan Genset'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

