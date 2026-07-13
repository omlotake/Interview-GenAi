import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, deleteInterviewReport } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"
import toast from "react-hot-toast"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            toast.success("Interview plan generated successfully!")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to generate interview plan. Please try again.")
        } finally {
            setLoading(false)
        }

        // response can be null if the request failed above - guard against
        // crashing the caller (Home.jsx does `data._id` right after this call)
        return response?.interviewReport ?? null
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to load this interview report.")
        } finally {
            setLoading(false)
        }
        return response?.interviewReport ?? null
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to load your interview plans.")
        } finally {
            setLoading(false)
        }

        return response?.interviewReports ?? null
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            toast.success("Resume downloaded successfully!")
        }
        catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to generate resume PDF. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const deleteReport = async (interviewId) => {
    setLoading(true)
    try {
        await deleteInterviewReport(interviewId)
        setReports(prev => prev.filter(r => r._id !== interviewId))
        toast.success("Interview plan deleted successfully!")
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Failed to delete interview plan.")
    } finally {
        setLoading(false)
    }
}

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf, deleteReport  }

}
