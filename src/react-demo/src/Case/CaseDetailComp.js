import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExtraDetail } from '../../redux/ActionCreators'
import '../../App.css'

const CaseDetailComp = ({ caseDetail, projectId }) => {
  const [isLoading, setLoading] = useState(false)

  // console.log('Project ID case Details Comp', projectId)

  const dispatch = useDispatch()
  const caseDetails = useSelector((state) => state.CaseDetail)

  useEffect(() => {
    return () => Swal.close()
  }, [])

  if (isLoading) {
    Swal.fire({
      title: `Loading ...`,
      // width:'800px',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
    }).then(() => {
      return Swal.close()
    })
    if (caseDetails?.caseDetails[0] != undefined && caseDetails.caseDetails[0].CaseId === caseDetail.caseId) {
      return setLoading(false)
    }
  } else {
    if (caseDetails?.caseDetails[0] != undefined && caseDetails.caseDetails[0].CaseId === caseDetail.caseId) {
      let subData = caseDetails.caseDetails[0].DocumentList[0]
      let date = subData.CreatedDate.slice(0, 10).split('-').reverse().join('/')

      let html = `<ul class='list-group d-flex gap-2'>
            <li class='list-group-item btn btn-primary border-0 details '>
              <span>Eigen Id</span>
              <span>:</span> <span>${subData.EigenDocumentId}</span>
            </li>
            <li class='list-group-item btn btn-primary border-0 details '>
              <span>File Name</span>
              <span>:</span> <span>${subData.FileName}</span>
            </li>
            <li class='list-group-item btn btn-primary border-0 details '>
              <span>Status</span>
              <span>:</span> <span>${subData.Status}</span>
            </li>
            ${
              isNaN(subData.GRCode)
                ? `<li class='list-group-item btn btn-primary border-0  details'>
                <span>GR Code </span>
                <span>:</span> <span> ${subData.GRCode}</span>
              </li>`
                : ''
            }
            ${
              isNaN(subData.GRUrl)
                ? `<li class='list-group-item btn btn-primary border-0  details'>
                <span>GR Url</span>
                <span>:</span> <span>${subData.GRUrl}</span>
              </li>`
                : ''
            }
            <li class='list-group-item btn btn-primary border-0 details '>
              <span>Remark</span>
              <span>:</span> <span>${subData.Remark}</span>
            </li>
            <li class='list-group-item btn btn-primary border-0  details'>
              <span>Created Date</span>
              <span>:</span> <span>${date}</span>
            </li>
          </ul>`

      Swal.update({
        title: `Case ID ${caseDetail.caseId}`,
        showConfirmButton: true,
        html: html,
      })
    }
  }

  const handleCaseIdClick = (e) => {
    e.preventDefault()
    dispatch(fetchExtraDetail(projectId, caseDetail.caseId))
    setLoading(true)
  }
  return (
    <tr onClick={(e) => handleCaseIdClick(e)}>
      <td className='cursor'>{caseDetail.caseId}</td>
      <td className='cursor'>{caseDetail.status}</td>
      <td className='cursor'>{caseDetail.uploadedBy === null ? 'Irfan Khan' : caseDetail.uploadedBy}</td>
      <td className='cursor'>{caseDetail.updatedDate.split('T').join(' ').slice(0, 18)}</td>
    </tr>
  )
}

export default CaseDetailComp
