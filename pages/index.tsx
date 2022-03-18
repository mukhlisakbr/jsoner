import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import JSONPretty from 'react-json-pretty'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import Head from 'next/head'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const Home: NextPage = () => {
  const [json, setJson] = useState<any>()
  const [pro, setPro] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    try {
      const json = JSON.parse(data.text)
      setPro(data.pro)
      setJson(json)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>JSONer | Make your json nicer.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-wrap px-8 my-8 max-w-6xl items-start  mx-auto gap-8 justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 items-center justify-center">
            <textarea
              {...register('text', { required: true })}
              className="textarea textarea-bordered resize-none block w-full"
              rows={10}
              cols={60}
              placeholder='{ "ugly" : "true" }'
            ></textarea>
            {errors.text && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! JSON cannot be empty</span>
                </div>
              </div>
            )}
            <div className="flex gap-4 items-center">
              <button type="submit" className="btn">
                Format
              </button>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2">
                  <span className="label-text text-md font-medium">PRO</span>
                  <input
                    {...register('pro')}
                    type="checkbox"
                    className="toggle toggle"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="">
          {pro ? (
            <div className="">
              <DynamicReactJson theme="google" src={json!} />
            </div>
          ) : (
            <JSONPretty id="json-pretty" data={json}></JSONPretty>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
