import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import Header from '../../components/Header/Header'
import Footer from '../Footer/Footer'
import { uploadDocuments } from '../../redux/ActionCreators'
import { Control, LocalForm } from 'react-redux-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react'

import Swal from 'sweetalert2'

const mapStateToProps = (state) => {
  return {
    state,
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadDocuments: (documentReq) => {
    dispatch(uploadDocuments(documentReq))
  },
})

function UploadDocuments(props) {
  const [uploadFile, setUploadFile] = useState()
  const [remark, setRemark] = useState('')

  const dispatch = useDispatch()
  let navigate = useNavigate()
  const { accounts } = useMsal()
  const documentUploadStatus = useSelector((state) => state.Documents)
  // const userProjectId = sessionStorage.getItem('projectId')
  // console.log('============>', typeof userProjectId)
  const userProjectId = useSelector((state) => state.ProjectId)

  // console.log(userProjectId)
  // const fileInputRef = useRef(null)
  const submitForm = (event) => {
    event.preventDefault()
    let projectId = parseInt(userProjectId.projectId)
    // console.log('Upload DOc Page', projectId)
    if (projectId) {
      const uploadDocument = new FormData()
      uploadDocument.append('File', uploadFile)
      uploadDocument.append('Remark', remark)
      uploadDocument.append('ProjectId', projectId)
      uploadDocument.append('CaseId', sessionStorage.getItem('caseId'))
      console.log('In the IF ++> Upload DOc Page', projectId, '\n', uploadDocument)

      dispatch(uploadDocuments(uploadDocument))
      setRemark('')
    }
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const date1 = date.getDate().toString()
    const time = date.toLocaleTimeString().toString()

    let newDate = year + date1 + month + time
    newDate = newDate.slice(0, newDate.length - 2)

    let [oldFileName, fileExtension] = e.target.files[0].name.split('.')
    let newName = oldFileName + '_' + newDate
    newName = newName.trimEnd() + '.' + fileExtension
    console.log('New File Name', newName)

    let temp = e.target.files[0]

    console.log(e.target)
    const file = new File([temp], newName)
    setUploadFile(file)
  }

  return (
    <div>
      <AuthenticatedTemplate>
        <Header />
        <div className='container browser-height'>
          <div className='row border mt-4'>
            <div className='d-grid gap-2 align-center'>
              <h5>Upload your documents here</h5>
              <p>Case Id : {sessionStorage.getItem('caseId') === 'NAN' ? 1 : sessionStorage.getItem('caseId')}</p>
            </div>
            <div className='d-grid gap-2'>
              <p>Click the button below to upload your files</p>
            </div>
          </div>

          <div className='row mt-4'>
            <LocalForm>
              <div className='form-group row align-left'>
                <label className='form-label' htmlFor='remark'>
                  Remark
                </label>
                <Control.textarea
                  model='.remark'
                  name='remark'
                  className='form-control'
                  rows='2'
                  id='remark'
                  value={remark}
                  onChange={(e) => {
                    e.preventDefault()
                    setRemark(e.target.value)
                    return
                  }}
                />
              </div>
              <br />
              <div className='form-group row align-left'>
                <label className='form-label' htmlFor='singlefileupload'>
                  Single file upload
                </label>
                <Control.file
                  type='file'
                  // key={uploadFile || " "}
                  model='.singlefileupload'
                  name='singlefileupload'
                  className='form-control'
                  // onChange={(e) => setUploadFile(e.target.files[0])}
                  onChange={handleFileChange}
                  id='singlefileupload'
                />
              </div>
              <br />

              <div className='form-group row align-left'>
                {documentUploadStatus != null && documentUploadStatus.documentStatus?.error != null && (
                  <div className='alert alert-danger mt-3 d-grid gap-2 align-center' role='alert'>
                    <p>{documentUploadStatus.documentStatus?.error.detail}</p>
                  </div>
                )}
                {documentUploadStatus.isLoading &&
                  (Swal.fire({
                    title: 'Uploading...',
                    html: 'Please wait...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    allowEnterKey: false,
                    didOpen: () => {
                      Swal.showLoading()
                    },
                  }).then(() => {
                    Swal.close()
                    return navigate('/caseList')
                  }),
                  (<div className='container'></div>))}
                {documentUploadStatus?.documentStatus?.length > 0 &&
                  (Swal.hideLoading(),
                  Swal.update({
                    icon: 'success',
                    title: 'File uploaded successfully',
                    html: '',
                    // isConfirmed: true,
                  }),
                  Swal.close(),
                  (<div></div>))}
                {documentUploadStatus?.documentStatus?.message?.length > 0 &&
                  (Swal.hideLoading(),
                  Swal.update({
                    icon: 'error',
                    title: 'Error',
                    html: '',
                    // isConfirmed: true,
                  }),
                  Swal.close(),
                  (
                    <div className='alert alert-danger mt-3 d-grid gap-2 align-center' role='alert'>
                      <p>{documentUploadStatus?.documentStatus?.message}</p>
                    </div>
                  ))}
              </div>
              <div className='form-group row mt-3 '>
                <div className='col-md-1 col-lg-1  '>
                  <button type='submit' onClick={(event) => submitForm(event)} className='btn btn-primary'>
                    Upload
                  </button>
                </div>
                <div className='col-md-1 col-lg-1'>
                  <Link to='/caseList' className='btn btn-danger'>
                    Cancel
                  </Link>
                </div>
              </div>
            </LocalForm>
          </div>
        </div>
        <Footer />
      </AuthenticatedTemplate>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadDocuments)
