import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

export default function UpdateForm() {
	const { data, setData, processing, errors } = useForm({
		userName: '',
		newUserName: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		axios
			.put('/api/change-user-name', {
				data: data,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="pb-12">
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 grid gap-6">
					<div className="text-gray-900 dark:text-gray-100">
						SQL injection update
					</div>

					<form onSubmit={submit}>
						<div>
							<InputLabel
								htmlFor="userName"
								value="User's Name"
							/>

							<TextInput
								id="userName"
								type="text"
								name="userName"
								value={data.userName}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData('userName', e.target.value)
								}
							/>

							<InputError
								message={errors.userName}
								className="mt-2"
							/>
						</div>

						<div className="mt-4">
							<InputLabel
								htmlFor="newUserName"
								value="New User's Name"
							/>

							<TextInput
								id="newUserName"
								type="text"
								name="newUserName"
								value={data.newUserName}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData('newUserName', e.target.value)
								}
							/>

							<InputError
								message={errors.newUserName}
								className="mt-2"
							/>
						</div>

						<PrimaryButton className="mt-6" disabled={processing}>
							Submit
						</PrimaryButton>
					</form>
				</div>
			</div>
		</div>
	);
}
