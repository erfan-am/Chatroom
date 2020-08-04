import React, { useState } from 'react';
import {Menu,Icon} from 'semantic-ui-react'

const Direct = () => {
    const [users,setUsers]=useState([])
    return (
        <Menu.Menu className="menu">
            <Menu.Item>
                <span>
                    <Icon
                        name="mail"
                    />Direct Message
                </span>{''}
                {users.length}
            </Menu.Item>
        </Menu.Menu>
    )
}

export default Direct
