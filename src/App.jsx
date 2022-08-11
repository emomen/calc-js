import { useState } from 'react'
import Button from './Button'

export default function App() {
  const [calc, setCalc] = useState('')
  const [answer, setAnswer] = useState('')
  const stateInfo = {calc, setCalc, answer, setAnswer}
  const buttons = ['Clear', 'Delete', '7', '8', '9', '÷', '4', '5',
    '6', '×', '1', '2', '3', '−', '.', '0', '=', '+']
  return (
    <main className='flex flex-col items-center w-screen h-screen justify-between'>
      <header>
        <h1 className='text-9xl mt-32'>Calculator</h1>
        <section className='h1underline bg-black h-3 w-full opacity-0 hover:opacity-1 ease-in-out duration-300 mb-20'></section>
      </header>
      <section className='bg-zinc-700 p-10 rounded-lg drop-shadow-2xl mb-20'>
        <div className='bg-yellow-300 h-28 w-80 mb-5 flex flex-col items-end p-5 font-bold text-3xl'>
          <p className="h-1/2">{calc}</p>
          <p className="h-1/2">{answer}</p>
        </div>
        <div className='grid grid-cols-4 grid-rows-5 gap-5'>
          {buttons.map(bText => {
            return (
              <Button lgBtn={bText === 'Clear' || bText === 'Delete'} 
              innerText={bText} {...stateInfo} />
            )
          })}
        </div>
      </section>
      <footer className="bg-zinc-900 w-full text-white p-10 justify-self-end">
            <section className="max-w-4xl m-auto grid grid-cols-2 items-center">
                <p className='text-md text-right pr-10 border-r-2 border-r-white'>
                    © Untitled. All rights reserved.
                </p>
                <p className='text-md text-left pl-10 border-l-2'>
                Background photo by <a className="underline" href="https://unsplash.com/@marcusurbenz">Marcus Urbenz</a> on <a className="underline" href="https://unsplash.com/">Unsplash</a> 
                </p>
            </section>
        </footer>
    </main>
  )
}
