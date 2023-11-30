import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { User } from '@/types';

export default function FollowForm(
	props:{user:User}
)  {
	const { data, setData, processing, errors } = useForm({
        id: props.user.id,
		user: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		axios
			.post('/api/follow-user', {
				data,
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
						Follow User
					</div>

					<form onSubmit={submit}>
						<div>
							<InputLabel
								htmlFor="user"
								value="Follow User"
							/>
							<TextInput
								id="user"
								type="text"
								name="followUser"
								value={data.user}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData('user', e.target.value)
								}
							/>

							<InputError
								message={errors.user}
								className="mt-2"
							/>
						</div>

						<PrimaryButton className="mt-6" disabled={processing}>
							Follow
						</PrimaryButton>
					</form>
				</div>
			</div>
		</div>
	);
}
