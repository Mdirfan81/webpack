import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { FaFilter } from 'react-icons/fa'

import Footer from '../Footer/Footer'
import { fetchPaginationWithToken, fetchProjectId } from '../../redux/ActionCreators'
import Pagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination'
import CaseDetailComp from './CaseDetailComp'
import { filterDataFun } from '../../util/filter'
import '../../App.css'
import Swal from 'sweetalert2'
const mapStateToProps = (state) => {
  return {
    state,
  }
}

const mapDispatchToProps = (dispatch) => ({})

function CaseList(props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedDropList, setSelectedDropList] = useState('All')
  const [projectIdState, setProjectIdState] = useState(0)

  //testing
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { accounts, instance } = useMsal()
  const caseList = useSelector((state) => state.Documents)
  const userProjectId = useSelector((state) => state.ProjectId)

  const dispatch = useDispatch()

  //here we need to call
  useEffect(() => {
    setLoading(true)
    //Stopping user not to switch any page without logIn !.
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    // Fetching the Data and fetch when the user is changing the page.
    console.log(accounts[0])
    if (accounts[0]?.idTokenClaims?.emails[0]) {
      let userEmail = accounts[0]?.idTokenClaims?.emails[0]
      dispatch(fetchProjectId(userEmail))
    }
  }, [dispatch, accounts[0]])

  useEffect(() => {
    if (userProjectId?.projectId > 0) {
      console.log('Case List 55', userProjectId?.projectId)
      sessionStorage.setItem('projectId', userProjectId?.projectId)
      setProjectIdState(userProjectId?.projectId)
      dispatch(fetchPaginationWithToken(userProjectId?.projectId, currentPage, postsPerPage, totalCount))
    }
    if (userProjectId?.projectId === 'Error') {
      Swal.fire({
        icon: 'error',
        title: 'Your are not associated with any project ',
        allowEscapeKey: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonText: ' Sign out',
        // footer: 'Please Contact to the Service',
      }).then(() => {
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.clear()
        instance.logoutRedirect()
        Swal.close()
        return
      })
    }
  }, [currentPage, dispatch, userProjectId])

  // Redirect to UploadDocument page
  const routeChange = (e) => {
    e.preventDefault()
    if (caseList) {
      let path = '/uploadDocuments'
      sessionStorage.removeItem('paginationToken')
      navigate(path)
      return
    }
  }

  const handleDroplist = (e, selected) => {
    e.preventDefault()
    setSelectedDropList(selected)
  }
  // checking max caseID, making use of this ID at the time of uploading the DOC .
  const maxCaseId = (data) => {
    let maxNumber = data[0]?.caseId
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.caseId > maxNumber) {
        maxNumber = data[i]?.caseId
      }
    }
    return maxNumber
  }

  // Render the list
  let renderCaseList = null
  renderCaseList = useMemo(() => {
    if (caseList.pageData != undefined && !caseList.isLoading && currentPage === 1) {
      let guid = maxCaseId(caseList.pageData.documents)
      // console.log('Guid', guid)
      if (guid === undefined) {
        sessionStorage.setItem('caseId', 1)
      } else {
        sessionStorage.setItem('caseId', guid + 1)
      }
    }

    if (caseList.pageData != undefined && !caseList.isLoading) {
      setTotalPage(Math.ceil(caseList.pageData.totalCount / postsPerPage))
      setTotalCount(0)
    }
    // let projectId = parseInt(accounts[0]?.idTokenClaims?.postalCode)
    if (caseList.pageData != undefined && !caseList.isLoading && caseList.pageData.documents.length > 0) {
      setLoading(false) // when all the process is done!
      // console.log('+...........................>', caseList.pageData.documents.length)
      if (caseList.pageData.documents.length === 0) {
        return <h1 className='fs-5 fw-normal text-muted'>No record found</h1>
      }
      let data = filterDataFun(caseList, selectedDropList)
      // console.log('============>', projectIdState)
      if (data.length < 1) {
        return <h1 className='fs-5 fw-normal text-muted'>No record found</h1>
      } else {
        return data.map((caseDetail, index) => (
          <CaseDetailComp key={index} caseDetail={caseDetail} projectId={projectIdState} />
        ))
      }
    }
  }, [caseList.pageData, selectedDropList, currentPage, accounts[0]])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    Swal.close()
  }

  const renderPagination = (
    <Pagination
      {...bootstrap5PaginationPreset}
      total={totalPage}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
    />
  )
  return (
    <>
      <div>
        <AuthenticatedTemplate>
          <Header />
          <br />
          <div className='container browser-height overflow-auto'>
            <div className='row'>
              <div className='d-grid gap-2 align-end'>
                <button type='submit' className='btn btn-primary content-end' onClick={routeChange}>
                  Create CaseId & Upload
                </button>
              </div>
            </div>
            <div>
              <table className='table table-hover  '>
                <thead>
                  <tr>
                    <th scope='col'>CaseId</th>
                    <th scope='col'>
                      <div className=' d-flex align-items-center'>
                        <span
                          className='px-2 btn'
                          type='button'
                          id='dropdownMenuButton1'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <FaFilter />
                        </span>

                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                          <li
                            className={`dropdown-item cursor-pointer ${selectedDropList === 'All' && 'active'}`}
                            onClick={(e) => handleDroplist(e, 'All')}
                          >
                            All
                          </li>
                          <li
                            className={`dropdown-item cursor-pointer ${
                              selectedDropList === 'UploadedToEigen' && 'active'
                            }`}
                            onClick={(e) => handleDroplist(e, 'UploadedToEigen')}
                          >
                            Uploaded to Eigen
                          </li>
                          <li
                            className={`dropdown-item cursor-pointer ${
                              selectedDropList === 'ProcessedByEigen' && 'active'
                            }`}
                            onClick={(e) => handleDroplist(e, 'ProcessedByEigen')}
                          >
                            Process by Eigen
                          </li>
                          <li
                            className={`dropdown-item cursor-pointer ${
                              selectedDropList === 'ProcessedByGlobalRadar' && 'active'
                            }`}
                            onClick={(e) => handleDroplist(e, 'ProcessedByGlobalRadar')}
                          >
                            Process by Global Radar
                          </li>
                        </ul>

                        <span className=''>Status</span>
                      </div>
                    </th>
                    <th scope='col'>Uploaded By</th>
                    <th scope='col'>Updated Date</th>
                  </tr>
                </thead>

                <tbody>{(caseList.isLoading ? <tr>Loading...</tr> : renderCaseList) || []}</tbody>
              </table>
            </div>

            {caseList.pageData ? renderPagination : null}
          </div>
          <Footer />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate></UnauthenticatedTemplate>
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseList)
