import { useState } from 'react'
import { Menu } from 'antd'

import { server } from '../config/axios'

const DropdownAction = ({ transaction, getTransaction , isSearch, onSubmitSearch }) => {
	const [loading, setLoading] = useState()

	const onClickApproved = async ({ id, status, user }) => {
		try {
			const res = await server.patch(`/transaction/${id}`, { status: status, user: user })
			console.log(res)
			if (isSearch) {
				onSubmitSearch()
			} else {
				getTransaction()
			}
		} catch (error) {
      console.log(error.response)
    } finally {
      setLoading('')
    }
	}

	return (
		<Menu className="t-da-menu">
		{
			(transaction.status === 'pending' || transaction.status === 'cancel') &&
	    <Menu.Item key={ 1 }>
	      <span style={{ color: 'rgba(10, 207, 131, 1)' }} onClick={ () => onClickApproved(transaction) }>Aprroved</span>
	    </Menu.Item>
		}
		{
			(transaction.status === 'approved') &&
	    <Menu.Item key={ 2 }>
	      <span style={{ color: 'rgba(255, 0, 0, 1)' }} onClick={ () => onClickApproved(transaction) }>Cancel</span>
	    </Menu.Item>
		}
	  </Menu>
	)
}

export default DropdownAction
