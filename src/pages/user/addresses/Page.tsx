import { useState, useEffect } from 'react'
import { BASE_URL } from '../../../shared/api/baseUrl'
import { useAuth } from '../../../shared/context/AuthContext'
import styles from './page.module.css'


interface Address {
	id: number
	city: string
	street: string
	house: string
	apartment: string
	entrance: string
	userId: number
}

interface AddressForm {
	city: string
	street: string
	house: string
	apartment: string
	entrance: string
}

const emptyForm: AddressForm = { city: '', street: '', house: '', apartment: '', entrance: '' }

export function AddressPage() {
	const { token, user } = useAuth()

	const [addresses, setAddresses] = useState<Address[]>([])
	const [editingId, setEditingId] = useState<number | null>(null)
	const [isAdding, setIsAdding] = useState(false)
	const [form, setForm] = useState<AddressForm>(emptyForm)
	const [isLoading, setIsLoading] = useState(false)

	const resetForm = () => {
		setForm(emptyForm)
		setEditingId(null)
		setIsAdding(false)
	}

	const fetchAddresses = async () => {
		if (!token || !user) return
		try {
			const response = await fetch(`${BASE_URL}/users/addresses`, { headers: { Authorization: `Bearer ${token}` } })
			const data = await response.json()
			setAddresses(data.filter((a: Address) => a.userId === user.id))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		if (user) fetchAddresses()
	}, [user, token])

	const handleChange = (field: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({ ...prev, [field]: e.target.value }))
	}

	const handleSave = async () => {
		if (!form.city || !form.street || !form.house || !user) return
		setIsLoading(true)
		const currentEditingId = editingId
		try {
			if (currentEditingId !== null) {
				const response = await fetch(`${BASE_URL}/users/address/${currentEditingId}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
					body: JSON.stringify(form)
				})
				console.log('PATCH status:', response.status)
				const text = await response.text()
				console.log('PATCH response:', text)
			} else {
				const response = await fetch(`${BASE_URL}/users/address`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
					body: JSON.stringify({ ...form, userId: user.id })
				})
				console.log('POST status:', response.status)
				const text = await response.text()
				console.log('POST response:', text)
			}
			await fetchAddresses()
			resetForm()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleEdit = (address: Address) => {
		setEditingId(address.id)
		setIsAdding(false)
		setForm({
			city: address.city,
			street: address.street,
			house: address.house,
			apartment: address.apartment,
			entrance: address.entrance,
		})
	}

	const handleDelete = async (id: number) => {
		try {
			await fetch(`${BASE_URL}/users/address/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
			await fetchAddresses()
			resetForm()
		} catch (err) {
			console.error(err)
		}
	}

	const renderForm = (isEdit: boolean, id?: number) => (
		<div className={styles.form}>
			<div className={styles.fieldGroup}>
				<label className={styles.label}>Місто</label>
				<input className={styles.input} value={form.city} onChange={handleChange('city')} placeholder="Місто" />
			</div>
			<div className={styles.fieldGroup}>
				<label className={styles.label}>Вулиця</label>
				<input className={styles.input} value={form.street} onChange={handleChange('street')} placeholder="Вулиця" />
			</div>
			<div className={styles.fieldGroup}>
				<label className={styles.label}>Будинок</label>
				<input className={styles.input} value={form.house} onChange={handleChange('house')} placeholder="Будинок" />
			</div>
			<div className={styles.fieldGroup}>
				<label className={styles.label}>Квартира</label>
				<input className={styles.input} value={form.apartment} onChange={handleChange('apartment')} placeholder="Номер квартири" />
			</div>
			<div className={styles.fieldGroup}>
				<label className={styles.label}>Під'їзд</label>
				<input className={styles.input} value={form.entrance} onChange={handleChange('entrance')} placeholder="Номер під'їзду" />
			</div>
			<div className={styles.formButtons}>
				{isEdit && id !== undefined && (
					<button className={styles.deleteBtn} onClick={() => handleDelete(id)}>ВИДАЛИТИ</button>
				)}
				{!isEdit && (
					<button className={styles.cancelBtn} onClick={resetForm}>СКАСУВАТИ</button>
				)}
				<button className={styles.saveBtn} onClick={handleSave} disabled={isLoading || !form.city || !form.street || !form.house}>
					{isLoading ? 'ЗБЕРЕЖЕННЯ...' : 'ЗБЕРЕГТИ ЗМІНИ'}
				</button>
			</div>
		</div>
	)

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Адреса доставки</h2>

			<div className={styles.addressList}>
				{addresses.map((address) => (
					<div key={address.id} className={`${styles.addressCard} ${editingId === address.id ? styles.addressCardActive : ''}`}>
						<div className={styles.addressCardHeader}>
							<div className={styles.radioWrapper}>
								<div className={`${styles.radio} ${editingId === address.id ? styles.radioActive : ''}`} />
								<span className={styles.addressText}>{address.city}, {address.street}, {address.house}</span>
							</div>
							<button className={styles.editBtn} onClick={() => editingId === address.id ? resetForm() : handleEdit(address)}>✎</button>
						</div>
						{editingId === address.id && renderForm(true, address.id)}
					</div>
				))}
			</div>

			{isAdding && (
				<div className={styles.addressCard}>
					{renderForm(false)}
				</div>
			)}

			{!isAdding && editingId === null && (
				<button className={styles.addBtn} onClick={() => setIsAdding(true)}>+ ДОДАТИ АДРЕСУ</button>
			)}
		</div>
	)
}