import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'

interface type{
setToggleopen:any;
toggleopen:boolean;
content:any;
kinematic_label:any

}
const Sideoverlay = (props:type) => {
    const [open, setOpen] = useState(true)
    const categories=props.content
    function classNames(...classes:any) {
        return classes.filter(Boolean).join(' ')
      }
    

    return (
      <Transition.Root show={props.toggleopen} as={Fragment}>
        <Dialog className="relative z-20" onClose={props.setToggleopen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {props.kinematic_label}
                           
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => props.setToggleopen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <span id="content is here "></span>
                        <div className="w-full  px-2 py-16 sm:px-0">
                    
  
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-grey/100 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-grey-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            <div>
            {category} &#40;{JSON.stringify(categories[category]["number"])}&#41;

            </div>
            
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">

        {Object.values(categories).map((e:any) => (
          <Tab.Panel
            key={"1"}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            
             
            {e.component}
            <br></br>
             {/* 

              {e.componentnil&&
            <div>
               <strong>
              Eliminated impairments
            </strong>
            {e.componentnil}

            </div>
            }
             
             */}
           
           

          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  </div>

                        
                        </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}

export default Sideoverlay