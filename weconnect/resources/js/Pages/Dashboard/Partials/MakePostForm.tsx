import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { User } from '@/types';

export default function MakePostForm(props: {
	user: User;
	signalNewPost: () => void;
}) {
	const { data, setData, processing, errors } = useForm({
		id: props.user.id,
		title: '',
		content: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		axios
			.post('/api/make-post', {
				data,
			})
			.then((res) => {
				console.log(res.data);
				props.signalNewPost();
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
						Make Post
					</div>

					<form onSubmit={submit}>
						<div>
							<InputLabel htmlFor="title" value="Make a title" />

							<TextInput
								id="title"
								type="text"
								name="newPost"
								value={data.title}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData('title', e.target.value)
								}
							/>

							<InputError
								message={errors.title}
								className="mt-2"
							/>
						</div>
						<div>
							<InputLabel
								htmlFor="content"
								value="Write Content"
							/>

							<TextInput
								id="content"
								type="text"
								name="content"
								value={data.content}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData('content', e.target.value)
								}
							/>

							<InputError
								message={errors.content}
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
