import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    placeholder,
    type= 'text',
    classname='',
    ...props
},ref) {

    const id=useId();
  return (
    <div className='flex flex-col gap-2'>
            <label htmlFor={id} className='text-sm font-medium text-gray-700'>{label}</label>
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
                    focus:bg-gray-50 duration-200 border border-gray-200 w-full
                    ${classname}`}
                ref={ref}
                placeholder={placeholder}
                {...props}
                id={id}
               
            />
        </div>
  )
})

export default Input
