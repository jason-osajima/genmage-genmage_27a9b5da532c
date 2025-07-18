'use client'

import { useState } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const toggleSign = () => {
    if (display.charAt(0) === '-') {
      setDisplay(display.slice(1))
    } else {
      setDisplay('-' + display)
    }
  }

  const percentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const Button = ({ onClick, className, children }: { onClick: () => void; className?: string; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-150 hover:opacity-80 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Calculator
          </h1>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
            <div className="text-right text-3xl font-mono font-bold text-gray-800 dark:text-white break-all">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clearDisplay}
            className="bg-red-500 hover:bg-red-600 text-white col-span-2"
          >
            AC
          </Button>
          <Button
            onClick={clearEntry}
            className="bg-red-400 hover:bg-red-500 text-white"
          >
            CE
          </Button>
          <Button
            onClick={() => inputOperation('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber('7')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation('*')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber('4')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber('1')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            3
          </Button>
          <Button
            onClick={() => inputOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber('0')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            .
          </Button>
          <Button
            onClick={performCalculation}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            =
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Button
            onClick={toggleSign}
            className="bg-gray-400 hover:bg-gray-500 text-white"
          >
            ±
          </Button>
          <Button
            onClick={percentage}
            className="bg-gray-400 hover:bg-gray-500 text-white"
          >
            %
          </Button>
          <Button
            onClick={() => {
              if (display.length > 1) {
                setDisplay(display.slice(0, -1))
              } else {
                setDisplay('0')
              }
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white"
          >
            ⌫
          </Button>
        </div>
      </div>
    </div>
  )
}