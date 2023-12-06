import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button } from '../components';

const SignIn = ({ signIn }) => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			handleSignIn();
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Email is invalid').required('Email is required'),
		}),
	});

	const handleSignIn = () => {
		//console.log(formik.values);
        
		axios
			.post('http://localhost:4000/login', formik.values)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	return (
		<div
			className={`absolute top-0 h-full transition-all duration-600 left-0 w-1/2 z-2 ${
				!signIn ? 'transform translate-x-100' : ''
			}`}
		>
			<form
				className="bg-white flex items-center justify-center flex-col px-10 h-full text-center"
				onSubmit={formik.handleSubmit}
			>
				<h1 className="font-bold m-0">Sign in</h1>
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="email"
					name="email"
					placeholder="Enter your email"
					value={formik.values.email}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="email" component="div" /> */}
				<input
					className="rounded-lg bg-gray-200 border-none p-3 my-2 w-full text-sm"
					type="password"
					name="password"
					placeholder="Enter your password"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>
				{/* <ErrorMessage className="text-red-500 text-xs" name="password" component="div" /> */}
				<a className="text-gray-700 text-sm md:text-lg no-underline my-4" href="#">
					Forgot your password?
				</a>
				<Button type="submit">
					Sign In
				</Button>
			</form>
		</div>
	);
};

export default SignIn;