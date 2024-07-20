import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon,EyeIcon,QueueListIcon,DocumentCheckIcon ,FolderIcon} from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Identify kinematic deviations',
    description:
      'The first stage involves selecting the kinematic deviation / missing essential components in the desired activity. This system can account for up to 4096 unique gait patterns (functional or not) based on combinations of kinematic deviations.',
    href: '#',
    icon: EyeIcon,
  },
  {
    name: 'Testing impairments',
    description:
      'The system will then generate appropriate impairments that could be contributing to the deviation. You can then test for those impairments ',
    href: '#',
    icon: QueueListIcon,
  },
  {
    name: 'Actionable insights',
    description:
      'Appropriate and individualised exercises will then be generated based on the deviations and impairments tested positive. This can then be downloaded as a pdf. ',
    href: '#',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Gait Classification',
    description:
      'This website allows you to capture the quality of any given gait with 4 letters (patterns of kinematic deviations). You can then store this code for future use. (for whatever use case you might come up with) ',
    href: '#',
    icon: FolderIcon,
  },
]

export default function Explanation() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-mq-lightred">Movement Analysis Support tool</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Systematic clinical reasoning
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
           This tool helps you to be systematic, making the complex simple.
           <br></br>
           Simple and reliable logic based tool and it is mobile friendly so you can use it on the go!

          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-mq-lightred" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm font-semibold leading-6 text-mq-lightred">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
