import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import Source from "../components/Source";

const BalancerWrapper = (props: any) => <Balancer {...props} />

export type Message = {
  who: 'bot' | 'user' | undefined
  message?: string
  sources?: any
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ who = 'bot', message, sources }: Message) {
  if (!message) {
    return null
  }
  const formatteMessage = convertNewLines(message)

  return (
    <div
      className={
        who != 'bot' ? 'float-right clear-both' : 'float-left clear-both'
      }
    >
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900">
                <a href="#" className="hover:underline">
                  {who == 'bot' ? 'AI' : 'You'}
                </a>
              </p>
              <p
                className={clsx(
                  'text ',
                  who == 'bot' ? 'font-semibold font- ' : 'text-gray-400'
                )}
              >
                {formatteMessage}
                    
               
              </p>
              {sources && sources.map((source_doc, index) => {
                              const {page_content, metadata} = source_doc
                              const {page, source} = metadata
                              return (
                                   <Source key={index} index={index+1} page={page} page_content={page_content} source={source} />
                              )
                        })}
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  )
}
