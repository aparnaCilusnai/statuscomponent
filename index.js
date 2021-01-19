import React, {useState, useEffect} from 'react'
// import {useQuery, useMutation} from '@apollo/react-hooks'
import * as R from 'ramda'
import Icon from 'material-svg-icons-react'
// import moment from 'moment'

// import {ACTIVITY_STATE} from 'XGraphQL/Queries'
// import {UPDATE_STATE, PERSIST_FIELD} from 'XGraphQL/Mutations'
// import {ticksInTime} from 'Utils/Others/TimeTicks'
// import './Status.scss'

export default function StatusConsumer(props) {
  const [isEnableList, setisEnableList] = useState(false)
//   const {data, loading, client, refetch} = useQuery(ACTIVITY_STATE, {
//     fetchPolicy: 'no-cache',
//   })
//   const [UpdateStatus] = useMutation(UPDATE_STATE, {fetchPolicy: 'no-cache'})
//   const [PersistStatus] = useMutation(PERSIST_FIELD, {fetchPolicy: 'no-cache'})
    let data = props.data
//   useEffect(() => {
//     if (data){
//       let status = JSON.parse(data)
//       const newStatus = status.map(item => {
//         if (item.startDate && item.endDate) {
//           let start = ticksInTime(item.startDate)
//           let end = ticksInTime(item.endDate)
//           const startDate = moment(start, "DD-MM-YYYY hh:mm A")
//           const endtime = moment(end, "DD-MM-YYYY hh:mm A")
//           let duration = moment.duration(endtime.diff(startDate)).humanize();
//           item.duration = duration
//         }
//         return item
//       }
//       )
//       status=newStatus
//       data = JSON.stringify(status)
//     }
      
//   }, [data])
//   useEffect(() => {
//     if (props.reload) {
//       refetch()
//       // props.setReload(false)
//     }
//   }, [props])
  // console.log(' status consumer', data)
  const ChangeStatus = index => {
    let status = JSON.parse(data)
    setisEnableList(false)
    let xLens = R.lensProp('isSelected')
    let currentIndex = R.findIndex(R.propEq('isSelected', true))(status)
    status = R.update(
      currentIndex,
      R.set(xLens, false, R.find(R.propEq('isSelected', true))(status)),
      status,
    )
    status = R.update(
      index,
      R.set(xLens, true, R.view(R.lensIndex(index), status)),
      status,
    )
    data = JSON.stringify(status)
    // UpdateStatus({variables: {status: JSON.stringify(status)}})
    // PersistStatus({variables: {Key: 'State', Value: JSON.stringify(status)}})
  }

     if (!R.isNil(data)) {
       if (!R.isEmpty(data)) {
        return StatusView(
          JSON.parse(data),
          setisEnableList,
          isEnableList,
          ChangeStatus,
        )
      }
    return null
  }
}
const StatusView = (state, setisEnableList, isEnableList, ChangeStatus) => {
  const mapIndexed = R.addIndex(R.map)
  return isEnableList
    ? mapIndexed(
        (item, index) => StatusListView(item, index, ChangeStatus),
        state,
      )
    : SelectedStatus(state, setisEnableList)
}

const SelectedStatus = (status, setisEnableList) => {
  const currentStatus = R.find(R.propEq('isSelected', true))(status)
  return (
    <div
      className="CurrentStatusContainer"
      style={{backgroundColor: currentStatus['color']}}
      onClick={() => setisEnableList(true)}
      key={currentStatus['name']}
    >
      <div className="CurrentStatusDisplay">
        <Icon
          name={currentStatus['icon']}
          size={'18px'}
          color={'white'}
          style={{marginRight: '8px'}}
        />
        {currentStatus['name']}
      </div>
    </div>
  )
}

const StatusListView = (item, index, ChangeStatus) => {
  return (
    <div key={index} className="ConsumerStatusList">
      <button
        className="StatusConsumerButton"
        style={{outline: 'none'}}
        onClick={() => ChangeStatus(index)}
      >
        <span style={{backgroundColor: item.color}} className="StatusConsumer">
          <Icon name={item.icon} size={'18px'} color={'white'} />
        </span>
        {item.name}
        <span className="CurrentStatusCheck">
          {item.isSelected ? (
            <Icon name={'check'} size={'18px'} color="inherit" />
          ) : 
            // item.duration ? item.duration :
             null
          }
        </span>
      </button>
    </div>
  )
}
