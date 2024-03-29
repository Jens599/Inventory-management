import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import hero from '../assets/Signup.jpg';
import { useSignup } from '../hooks/useSignup';
import { Navigate } from 'react-router-dom';

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username must be defined.' })
      .min(3, { message: 'Username must be at least 3 characters.' }),
    name: z
      .string()
      .min(1, { message: 'Name must be defined' })
      .regex(/(^[A-Za-z]+\s(?=[a-zA-Z])+)/, {
        message: 'Please enter your full name.',
      }),
    email: z
      .string()
      .min(1, { message: 'Email must be defined.' })
      .email('Please enter an email.'),
    phone: z
      .number({ invalid_type_error: 'Phone must be defined.' })
      .min(1, { message: 'Phone must be defined.' })
      .nonnegative('Phone cannot be a negative value.')
      .min(9000000000, {
        message: 'Phone must begin with a 9 and be of 10 digits.',
      })
      .max(9999999999, { message: 'Phone must be 10 digits.' }),
    password: z
      .string()
      .min(1, { message: 'Password must be defined.' })
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    cpassword: z
      .string()
      .min(1, { message: 'Confirm Password must be defined.' }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Must Match Password Field.',
    path: ['cpassword'],
  });

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { signup, error, token } = useSignup();

  const onSubmit = (data: FormData) => {
    signup(data);
  };

  return (
    <div
      className='mb-0 ml-auto mr-auto mt-0 flex max-w-7xl flex-col items-center justify-between pb-0 pl-10 pr-10 pt-0
      shadow-2xl lg:flex-row xl:px-5 '
    >
      <div className='flex w-full flex-col items-center pb-20 pl-10 pr-10 pt-5 lg:flex-row lg:pt-20'>
        <div className='relative w-full max-w-md bg-cover lg:w-7/12 lg:max-w-2xl'>
          <div className='relative flex h-full w-full flex-col items-center justify-center lg:pr-10'>
            <img src={hero} />
            <a
              className='hidden text-xs lg:inline'
              href='https://www.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_11879344.htm#query=register&position=1&from_view=search&track=sph'
            >
              Image by jcomp on Freepik
            </a>
          </div>
        </div>
        <div className='relative z-10 mb-0 ml-0 mr-0 mt-20 w-full max-w-2xl lg:mt-0 lg:w-5/12'>
          <div
            className='relative z-10 flex flex-col items-start justify-start rounded-xl bg-white pb-10 pl-10 pr-10
            pt-10 shadow-2xl'
          >
            <p className='w-full text-center font-serif text-4xl font-medium leading-snug'>
              Sign up for an account
            </p>

            <form
              method='post'
              onSubmit={handleSubmit(onSubmit)}
              className='relative mb-0 ml-0 mr-0 mt-6 w-full space-y-8'
            >
              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Username
                </p>
                <input
                  {...register('username')}
                  placeholder='Enter your Username here.'
                  type='text'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.username && (
                  <p className='text-xs text-red-500'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Full Name
                </p>
                <input
                  {...register('name')}
                  placeholder='Enter your Full Name here.'
                  type='text'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>

              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Email
                </p>
                <input
                  {...register('email')}
                  placeholder='Enter your Email here.'
                  type='email'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.email && (
                  <p className='text-xs text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Phone Number
                </p>
                <input
                  {...register('phone', { valueAsNumber: true })}
                  placeholder='Enter your Phone Number here.'
                  type='number'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none '
                />
                {errors.phone && (
                  <p className='text-xs text-red-500'>{errors.phone.message}</p>
                )}
              </div>

              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Password
                </p>
                <input
                  {...register('password')}
                  placeholder='Enter your Password here.'
                  type='password'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.password && (
                  <p className='text-xs text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='relative'>
                <p
                  className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white pb-0 pl-2 pr-2 pt-0 font-medium
                  text-gray-600'
                >
                  Confirm Password
                </p>
                <input
                  {...register('cpassword')}
                  placeholder='Enter your Confirm Password here.'
                  type='password'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white pb-4 pl-4 pr-4 pt-4 text-base placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.cpassword && (
                  <p className='text-xs text-red-500'>
                    {errors.cpassword.message}
                  </p>
                )}
              </div>

              {error && <p className='text-xs text-red-500'>{error}</p>}
              {token && (
                <p className='text-xs text-green-500'>
                  Successfully Registered
                </p>
              )}
              {token && <Navigate to='/dashboard/addItem' />}
              <div className='relative'>
                <input
                  type='submit'
                  value='Signup'
                  className='ease inline-block w-full rounded-lg bg-indigo-500 pb-4 pl-5 pr-5 pt-4 text-center
                  text-xl font-medium text-white transition duration-200 hover:bg-indigo-600'
                />
              </div>
            </form>
          </div>
          <svg
            viewBox='0 0 91 91'
            className='absolute left-0 top-0 z-0 -ml-12 -mt-12 h-32 w-32 fill-current
            text-yellow-300'
          >
            <g
              stroke='none'
              strokeWidth='1'
              fillRule='evenodd'
            >
              <g fillRule='nonzero'>
                <g>
                  <g>
                    <circle
                      cx='3.261'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.445'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.445'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 12)'>
                    <circle
                      cx='3.261'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.525'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.525'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 24)'>
                    <circle
                      cx='3.261'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.605'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.605'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 36)'>
                    <circle
                      cx='3.261'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.686'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.686'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 49)'>
                    <circle
                      cx='3.261'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.767'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.767'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 61)'>
                    <circle
                      cx='3.261'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.846'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.846'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 73)'>
                    <circle
                      cx='3.261'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.926'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.926'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 85)'>
                    <circle
                      cx='3.261'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.006'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.006'
                      r='2.719'
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <svg
            viewBox='0 0 91 91'
            className='absolute bottom-0 right-0 z-0 -mb-12 -mr-12 h-32 w-32 fill-current
            text-indigo-500'
          >
            <g
              stroke='none'
              strokeWidth='1'
              fillRule='evenodd'
            >
              <g fillRule='nonzero'>
                <g>
                  <g>
                    <circle
                      cx='3.261'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.445'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.445'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.445'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 12)'>
                    <circle
                      cx='3.261'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.525'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.525'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.525'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 24)'>
                    <circle
                      cx='3.261'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.605'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.605'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.605'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 36)'>
                    <circle
                      cx='3.261'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.686'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.686'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.686'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 49)'>
                    <circle
                      cx='3.261'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.767'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.767'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.767'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 61)'>
                    <circle
                      cx='3.261'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.846'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.846'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.846'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 73)'>
                    <circle
                      cx='3.261'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='2.926'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='2.926'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='2.926'
                      r='2.719'
                    />
                  </g>
                  <g transform='translate(0 85)'>
                    <circle
                      cx='3.261'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='15.296'
                      cy='3.006'
                      r='2.719'
                    />
                    <circle
                      cx='27.333'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='39.369'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='51.405'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='63.441'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='75.479'
                      cy='3.006'
                      r='2.72'
                    />
                    <circle
                      cx='87.514'
                      cy='3.006'
                      r='2.719'
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Signup;
