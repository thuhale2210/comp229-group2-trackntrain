import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button } from '../components';
import React, { useState} from 'react';

const SignUp = ({ signIn }) => {
	const [isRegistered, setIsRegistered] = useState(false);
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			gender: 'male',
			email: '',
			password: '',
			confirmPassword: '',
			role: 'customer',
		},
		onSubmit: (values) => {
			handleSignUp();
		},
		validationSchema: yup.object().shape({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			gender: yup.string().oneOf(['male', 'female'], 'Required').required('Gender is required'),
			email: yup.string().email('Email is invalid').required('Email is required'),
			password: yup
				.string()
				.min(6, 'Password must be at least 6 characters')
				.required('Password is required'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Password not matched')
				.required('Password is required'),
			role: yup
				.string()
				.required()
				.oneOf(['customer', 'trainer'], 'Selecting user type is required'),
		}),
	});

	const handleSignUp = () => {
		//console.log(formik.values);
		var newUser = {
			firstName: formik.values.firstName,
			lastName: formik.values.lastName,
			gender: formik.values.gender,
			email: formik.values.email,
			password: formik.values.password,
			role: formik.values.role,
		};

		axios
			.post('http://localhost:4000/addAccount', newUser)
			.then((res) => {
				console.log(res.data);
				setIsRegistered(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div
			className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${!signIn ? 'transform translate-x-full opacity-100 z-5' : 'opacity-0 z-1'
				}`}
		>
			{isRegistered && (
            <div className="absolute top-10 right-10 bg-green-200 p-3 rounded-md shadow-md">
                <p className="text-green-800">Registration successful!</p>
            </div>
        	)}
			<form
				className="bg-white flex items-center justify-center flex-col px-10 h-full text-center"
				onSubmit={formik.handleSubmit}
			>
				<h4 className="font-bold mt-5 text-black text-xl">Create Account</h4>
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="text"
					name="firstName"
					placeholder="Enter your First Name"
					value={formik.values.firstName}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="firstName" component="div" /> */}
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="text"
					name="lastName"
					placeholder="Enter your Last Name"
					value={formik.values.lastName}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="lastName" component="div" /> */}
				<div className="flex items-center w-full">
					<div className="col-auto w-1/3">
						<p className="text-gray-800 text-sm font-hairline tracking-wide">Gender:</p>
					</div>
					<div className='col-auto flex w-1/3'>
						<label class="cursor-pointer">
							<input
								type="radio"
								className="peer sr-only"
								name="gender"
								checked={formik.values.gender === 'male'}
								onChange={() => formik.setFieldValue('gender', 'male')} />
							<div class="w-32 max-w-xl rounded-md bg-white my-3 p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-red peer-checked:ring-primary-red peer-checked:ring-offset-2">
								<div class="flex flex-col gap-1">
									<div class="flex items-center justify-center">
										<p class="text-sm text-gray-800">Male</p>
										{/* <div>
											<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
										</div> */}
									</div>
								</div>
							</div>
						</label>
					</div>
					<div className="col-auto flex w-1/3">
						<label class="cursor-pointer">
							<input
								type="radio"
								className="peer sr-only"
								name="gender"
								checked={formik.values.gender === 'female'}
								onChange={() => formik.setFieldValue('gender', 'female')} />
							<div class="w-32 max-w-xl rounded-md bg-white my-3 p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-red peer-checked:ring-primary-red peer-checked:ring-offset-2">
								<div class="flex flex-col gap-1">
									<div class="flex items-center justify-center">
										<p class="text-sm text-gray-800">Female</p>
										{/* <div>
											<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
										</div> */}
									</div>
								</div>
							</div>
						</label>
					</div>
				</div>
				{/* <ErrorMessage className="text-red-500 text-xs" name="gender" component="div" /> */}
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="email"
					name="email"
					placeholder="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="email" component="div" /> */}
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="password"
					name="password"
					placeholder="Password"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="password" component="div" /> */}
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="password"
					name="confirmPassword"
					placeholder="Confirm your password"
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="confirmPassword" component="div" /> */}
				<div className="flex items-center w-full">
					<div className="col-auto w-1/3">
						<p className="text-gray-800 text-sm font-hairline tracking-wide">You are:</p>
					</div>
					<div className='col-auto flex w-1/3'>
						<label class="cursor-pointer">
							<input
								type="radio"
								className="peer sr-only"
								name="role"
								checked={formik.values.role === 'customer'}
								onChange={() => formik.setFieldValue('role', 'customer')} />
							<div class="w-32 max-w-xl rounded-md bg-white my-3 p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-red peer-checked:ring-primary-red peer-checked:ring-offset-2">
								<div class="flex flex-col gap-1">
									<div class="flex items-center justify-center">
										<p class="text-sm text-gray-800">Customer</p>
										{/* <div>
											<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
										</div> */}
									</div>
								</div>
							</div>
						</label>
					</div>
					<div className="col-auto flex w-1/3">
						<label class="cursor-pointer">
							<input
								type="radio"
								className="peer sr-only"
								name="role2"
								checked={formik.values.role === 'trainer'}
								onChange={() => formik.setFieldValue('role', 'trainer')} />
							<div class="w-32 max-w-xl rounded-md bg-white my-3 p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-red peer-checked:ring-primary-red peer-checked:ring-offset-2">
								<div class="flex flex-col gap-1">
									<div class="flex items-center justify-center">
										<p class="text-sm text-gray-800">Trainer</p>
										{/* <div>
											<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
										</div> */}
									</div>
								</div>
							</div>
						</label>
					</div>
				</div>
				{/* <ErrorMessage className="text-red-500 text-xs" name="role" component="div" /> */}
				<Button type="submit">
					Sign up
				</Button>
			</form>
		</div>
	);
};

export default SignUp;