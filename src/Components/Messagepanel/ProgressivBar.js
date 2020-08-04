import React from 'react'
import {Progress} from 'semantic-ui-react'
const ProgressivBar = ({uploadState,percent}) =>(
    uploadState ==='uploading' && (
        <Progress
            className="progress_bar"
            percent={percent}
            progress
            indicating
            size="medium"
            inverted
        />
    )
)
export default ProgressivBar
