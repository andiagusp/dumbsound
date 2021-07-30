import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Dropdown, Button } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

import triangle from '../image/triangle.png'
import { server } from '../config/axios'
import DropdownAction from './DropdownAction'
import TransactionModal from './TransactionModal'
import Loading from './Loading'

const TransactionContent = () => {
	const [error, setError] = useState()
	const [date, setDate] = useState('')
	const [searchDateTransaction, setSearchDateTransaction] = useState()
	const [isSearch, setSearch] = useState(false)
  const [loading, setLoading] = useState()
	const [userData, setUserData] = useState()
  const [listTransactions, setListTransactions] = useState()
	const [visibleDropdown, setVisibleDropdown] = useState(false)
	const [visibleTransaction, setVisibleTransaction] = useState(false)
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
    return () => setListTransactions([])
  }, [])

  const getTransaction = async () => {
    try {
    	setLoading('Loading data...')
      const res = await server.get('/transactions')
      setListTransactions(res?.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading()
    }
  }

  const onSubmitSearch = async () => {
  	try {
  		const body = JSON.stringify({ date })
  		const headers = {
  			headers: { 'Content-Type': 'application/json' }
  		}
  		const result = await server.post('/transaction/date', body, headers)
  		setSearchDateTransaction(result.data.transactions)
  		setSearch(true)
  	} catch (err) {
  		if (err.hasOwnProperty('response')) {
  			setError(err.response.data.message)
  		}
  	} finally {
  		setTimeout(() => setError(), 3000)
  	}
  }

	const diffDay = (_dueDate) => {
		const split = _dueDate.split('/')
		const currentDay = new Date().getTime()
		const dueDate = new Date(`${split[1]}/${split[0]}/${split[2]}`).getTime()
		const result = Math.floor((dueDate - currentDay) / (1000 * 3600 * 24))
		return (result < 0) ? 0 : result
	}

	const autoNonactive = async ({ id, status, user}, index) => {
		try {
			await server.patch(`/transaction/${id}`, { status: status, user: user })
		} catch (error) {
      console.log(error.response)
    }
	}

	const onKeyPressEnter = (e) => {
		if (e.charCode === 13) {
			onSubmitSearch()
		}
	}

	const onClickCancelSearch = () => {
		getTransaction()
		setSearchDateTransaction()
		setSearch(false)
		setDate('')
	}

	return (
		<div className="transaction">
			<h2 className="t-title">Incomming Transaction</h2>
			<div className="form-search">
				<section>
					<input type="text" value={ date } onChange={ (e) => setDate(e.target.value) } onKeyPress={ onKeyPressEnter } placeholder="search date ex 22/05/2021" autoComplete="off" />
					{ error && <p>{ error }</p> }
				</section>
				{
					isSearch ? 
					<button type="submit" onClick={ onClickCancelSearch }><span><ImCross /></span></button>
					:
					<button type="submit" onClick={ onSubmitSearch }><span><AiOutlineSearch /></span></button>
				}
			</div>
			<Table responsive="md" className="t-table-wrapper">
				<thead>
		      <tr>
		        <th>No</th>
		        <th>Users</th>
		        <th>Bukti Transfer</th>
		        <th>Remaining Active</th>
		        <th>Start Date</th>
		        <th>Due Date</th>
		        <th>Status User</th>
		        <th>Status Payment</th>
		        <th style={{ textAlign: 'center' }}>Action</th>
		      </tr>
		    </thead>		    
	    	{
    			isSearch ? (
	    			<tbody>
	    			{
	    				(searchDateTransaction?.length === 0) ? (
		    				<tr>
		    					<td colSpan={ 9 } style={{ textAlign: 'center' }}> No Data </td>
		    				</tr>			
	    				) : (
	    					searchDateTransaction?.map((data, i) => {
	    						return (
	    							<tr>
	    								<td>{ ++i }</td>
	    								<td>{ data.user.fullName }</td>
	    								<td className="t-attache-name" onClick={ () => onClickAttache(data) }>{ data.attache }</td>
	    								<td>{ `${diffDay(data.dueDate)}` }</td>
	    								<td>{ data.startDate }</td>
	    								<td>{ data.dueDate }</td>
	    								<td style={{ color: colors[(data.status === 'approved')? 'active' : 'Not active'] }}>{ (data.status === 'approved')? 'active' : 'Not active' }</td>
							        <td style={{ color: colors[data.status] }}>{ data.status }</td>
							        <td className="t-table-dropdown">
							        	<Dropdown overlay={ <DropdownAction getTransaction={ getTransaction } transaction={ data } onSubmitSearch={ onSubmitSearch } isSearch={ isSearch } /> } placement="bottomLeft" arrow trigger="click">
										    	<img src={ triangle } alt="triangle-pict" className="t-table-dai" />
										    </Dropdown>
							        </td>
	    							</tr>
	    						)
	    					})
	    				)
	    			}
	    			</tbody>
	    		) : (
	    			<tbody>
				    	{ loading &&
				    	<tr>
				    		<td colSpan={ 9 } style={{ position: 'relative', height: 70 }}><span style={{ position: 'absolute', left: '50%' }}><Loading type="spin" color="#eaeaea" /></span></td>
				    	</tr> }
				    	{ listTransactions?.map((lt, i, arr) => {
				    		return (lt.user.listAs === '0') && (
					    		<tr key={ i }>
						        <td>{ ++i }</td>
						        <td>{ lt.user.fullName }</td>
						        <td className="t-attache-name" onClick={ () => onClickAttache(lt) }>{ lt.attache }</td>
						        <td>
						        	{ (diffDay(lt.dueDate) > 0) ? 
						        			`${diffDay(lt.dueDate)} / day` 
						        		: 
					        				(lt.status === 'approved') ? 
						        				autoNonactive(lt, i)
						        			:
						        			'cancel'
						        	}
						        </td>
						        <td>{ lt.startDate }</td>
						        <td>{ lt.dueDate }</td>
						        <td style={{ color: colors[(lt.status === 'approved')? 'active' : 'Not active'] }}>{ (lt.status === 'approved')? 'active' : 'Not active' }</td>
						        <td style={{ color: colors[lt.status] }}>{ lt.status }</td>
						        <td className="t-table-dropdown">
						        	<Dropdown overlay={ <DropdownAction getTransaction={ getTransaction } transaction={ lt } key={ i } isSearch={ isSearch } /> } placement="bottomLeft" arrow trigger="click">
									    	<img src={ triangle } alt="triangle-pict" className="t-table-dai" />
									    </Dropdown>
						        </td>
						      </tr>
						    )
				    		})
				  		}  	
						</tbody>
					)
	    	}
		    
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
