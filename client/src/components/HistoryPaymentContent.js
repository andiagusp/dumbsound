import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import Loading from './Loading'
import { server } from '../config/axios'
import TransactionModal from './TransactionModal'

const HistoryPaymentContent = () => {
	const [dataModal, setDataModal] = useState()
	const [isLoading, setLoading] = useState(false)
	const [paymentList, setPaymentList] = useState()
	const [visibleTransaction, setVisibleTransaction] = useState(false)
	const colors = {
		'approved': 'rgba(10, 207, 131, 1)',
		'cancel': 'rgba(255, 0, 0, 1)',
		'pending': 'rgba(247, 148, 30, 1)'
	}

	const onClickModalAttache = (data) => {
		setDataModal(data)
		setVisibleTransaction(!visibleTransaction)
	}

	const getPaymentHistory = async () => {
		try {
			setLoading(true)
			const res = await server.get('/transaction/user')
			console.log(res.data)
			setPaymentList(res.data.transactions)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getPaymentHistory()
	}, [])

	const diffDay = (_dueDate) => {
		const split = _dueDate.split('/')
		const currentDay = new Date().getTime()
		const dueDate = new Date(`${split[1]}/${split[0]}/${split[2]}`).getTime()
		const result = Math.floor((dueDate - currentDay) / (1000 * 3600 * 24))
		return (result < 0) ? 0 : result
	}

	return (
		<div className="historypayment">
			<h2 className="t-title">History Payment</h2>
			<small>If payment reject / cancel resend attache payment</small>
			<Table responsive="md" className="t-table-wrapper">
				<thead>
		      <tr>
		        <th>No</th>
		        <th>User</th>
		        <th>Bukti Transfer</th>
		        <th>Remaining Active</th>
		        <th>Start Date</th>
		        <th>Due Date</th>
		        <th>Status Payment</th>
		      </tr>
		    </thead>
		    <tbody>
		    	{ isLoading && 
		    		<tr>
		    			<td colSpan={ 7 } style={{ position: 'relative', height: 70 }}><span style={{ position: 'absolute', left: '50%' }}><Loading type="spin" color="#eaeaea" /></span></td>
		    		</tr>
		    	}
		    	{ (paymentList?.length === 0) &&
		    		<tr>
		    			<td colSpan={ 7 }><p style={{ textAlign: 'center' }}>No Data Payment</p></td>
		    		</tr>
		    	}
		    	{
		    		paymentList?.map((payment, i) => {
		    			return (
		    				<tr>
		    					<td>{ ++i }</td>
		    					<td>{ payment.user.fullName }</td>
		    					<td className="t-attache-name" onClick={ () => onClickModalAttache(payment) }>{ payment.attache }</td>
		    					<td>{ diffDay(payment.dueDate) + ' / day' }</td>
		    					<td>{ payment.startDate }</td>
		    					<td>{ payment.dueDate }</td>
		    					<td style={{ color: colors[payment.status] }}>{ payment.status }</td>
		    				</tr>
		    			)
		    		})
		    	}
		    </tbody>
			</Table>
			<TransactionModal
				user={ dataModal }
				visibleTransaction={ visibleTransaction }
				setVisibleTransaction={ setVisibleTransaction }
			/>
		</div>
	)
}

export default HistoryPaymentContent
