import queryClient from '@/lib/queryClient'
import axiosClient from '../lib/axios'
import { useMutation , useQuery } from '@tanstack/vue-query'

const fetchRatings = async () => {
  const { data } = await axiosClient.get("/get-rating")
  return data
}

export const useGetRatings = () =>
  useQuery({
    queryKey: ["ratings"],
    queryFn: fetchRatings,
})

const fetchAllRatings = async () => {
  const { data } = await axiosClient.get("/get-all-rating")
  return data
}

export const useGetAllRatings = () =>
  useQuery({
    queryKey: ["all-ratings"],
    queryFn: fetchAllRatings,
})


const addNewRating = async (data: {email: string, nev: string, rating: number, leiras: string, vercode: number}) => {
    const response = await axiosClient.post('/add-rating', data);
    return response.data
}

export const useAddNewRating = () => {
    return useMutation({
        mutationFn: addNewRating,
        onSuccess: (response) => {
          queryClient.refetchQueries({ queryKey: ["all-ratings"], exact: true });
        },
        onError: (error) => {

        }
    })
}

const verifyOtp = async (data: {email: string, nev: string}) => {
    const response = await axiosClient.post('/send-verify-code', data);
    return response.data
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyOtp,
        onSuccess: (response) => {

        },
        onError: (error) => {

        }
    })
}


const sendHelpReq = async (data: {email: string, nev: string, telefon: string, leiras: string, vercode: number}) => {
    const response = await axiosClient.post('/send-help-request', data);
    return response.data
}

export const useSendHelpReq = () => {
    return useMutation({
        mutationFn: sendHelpReq,
        onSuccess: (response) => {

        },
        onError: (error) => {

        }
    })
}