'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon,BookOpenIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Disclaimer_Content from './Disclaimer_Content'
import Exclusion_liability from './Exclusion_liability'
import { setWindow } from '@/app/utils/storage/storage'
import { useRouter } from 'next/navigation'
interface props{
    open:boolean;
    link:any;
    setOpen:any
}
export default function Example(props:props) {
  const [open, setOpen] = useState(props.open)

  const cancelButtonRef = useRef(null)
  const router = useRouter()

    return (
    

        <Transition.Root show={props.open} as={Fragment}>
          <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mq-rice">
                        <BookOpenIcon className="h-6 w-6 text-mq-black" aria-hidden="true" />
                      </div>
                        
             
                      <div className="mt-3 text-left sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Disclaimer Content
                        
                        </Dialog.Title>
                       <Disclaimer_Content></Disclaimer_Content>
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Exclusion of Liability
                        
                        </Dialog.Title>
                        <Exclusion_liability></Exclusion_liability>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                    
                      onClick={()=>{
                       setWindow("consent",true)
                        props.setOpen(false)
                        router.push(`${props.link}`)
                        
                       
                      }}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-mq-lightred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => {props.setOpen(false)
                            router.push(`activities`)
                        }
                            
                        }
                        
                        ref={cancelButtonRef}
                        
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )


  
}
