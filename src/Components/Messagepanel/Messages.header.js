import React, { useState } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader=({currentChannel,count,setSearch,load})=> {
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {currentChannel ? `${currentChannel.name}` : 'channel'}
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>{count}</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            onChange={(e)=>setSearch(e.target.value)}
            icon="search"
            loading={load}
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
}

export default MessagesHeader;
