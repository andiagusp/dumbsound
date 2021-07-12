import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Dropdown, Button } from 'antd'

import triangle from '../image/triangle.png'
import { server } from '../config/axios'
import DropdownAction from './DropdownAction'
import TransactionModal from './TransactionModal'

const TransactionContent = () => {
	const [userData, setUserData] = useState()
	const [visibleTransaction, setVisibleTransaction] = useState(false)
	const [visibleDropdown, setVisibleDropdown] = useState(false)
  const [listTransactions, setListTransaction] = useState()
  const [loading, setLoading] = useState()
  const colors = {
		'approved': 'rgba(10, 207, 131, 1)',
		'active': 'rgba(10, 207, 131, 1)',
		'Not active': 'rgba(255, 0, 0, 1)',
		'cancel': 'rgba(255, 0, 0, 1)',
		'pending': 'rgba(247, 148, 30, 1)',
	}

	const onClickDropdown = () => setVisibleDropdown(!visibleDropdown)

	const onClickAttache = (user) => {
		setUserData(user)
		setVisibleTransaction(!visibleTransaction)
	}

	useEffect(() => {
    getTransaction()
  }, [])

  const getTransaction = async () => {
    try {
    	setLoading('Loading data...')
      const res = await server.get('/transactions')
      setListTransaction(res.data.data)
      console.log(res?.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading()
    }
  }

	const diffDay = (_dueDate) => {
		const split = _dueDate.split('/')
		const currentDay = new Date().getTime()
		const dueDate = new Date(`${split[1]}/${split[0]}/${split[2]}`).getTime()
		const result = Math.ceil((dueDate - currentDay) / (1000 * 3600 * 24))
		return (result < 0) ? 0 : result
	}

	return (
		<div className="transaction">
			<h2 className="t-title">Incomming Transaction</h2>
			<Table responsive="md" className="t-table-wrapper">
				<thead>
		      <tr>
		        <th>No</th>
		        <th>Users</th>
		        <th>Bukti Transfer</th>
		        <th>Remaining Active</th>
		        <th>Status User</th>
		        <th>Status Payment</th>
		        <th style={{ textAlign: 'center' }}>Action</th>
		      </tr>
		    </thead>
		    <tbody>
		    { loading &&
		    	<tr>
		    		<td colSpan={ 7 }><p style={{ textAlign: 'center', fontSize: 20 }}>{ loading }</p></td>
		    	</tr> }
		    { listTransactions?.map((lt, i) => {
		    		return (lt.user.listAs === '0') && (
			    		<tr key={ i }>
				        <td>{ ++i }</td>
				        <td>{ lt.user.fullName }</td>
				        <td className="t-attache-name" onClick={ () => onClickAttache(lt) }>{ lt.attache }</td>
				        <td>{ `${diffDay(lt.dueDate)} / day`  }</td>
				        <td style={{ color: colors[(lt.status === 'approved')? 'active' : 'Not active'] }}>{ (lt.status === 'approved')? 'active' : 'Not active' }</td>
				        <td style={{ color: colors[lt.status] }}>{ lt.status }</td>
				        <td className="t-table-dropdown">
				        	<Dropdown overlay={ <DropdownAction getTransaction={ getTransaction } transaction={ lt } key={ i } /> } placement="bottomLeft" arrow trigger="click">
							    	<img src={ triangle } alt="triangle-pict" className="t-table-dai" />
							    </Dropdown>
				        </td>
				      </tr>
				    )
		    	})
		  	}
		    </tbody>
			</Table>
			<TransactionModal
				user={ userData }
				visibleTransaction={ visibleTransaction }
				setVisibleTransaction={ setVisibleTransaction }
			/>
		</div>
	)
}
export default TransactionContent
