import { useGetUserDetailsQuery } from '../../state/user/api';

export default function Auth({ children }) {
	const { isLoading } = useGetUserDetailsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	if (isLoading) {
		return <div></div>;
	}

	return children;
}
