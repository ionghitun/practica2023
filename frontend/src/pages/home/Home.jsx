import { useState } from 'react';
import { Badge, Button, Card, Center, Container, Group, Image, Pagination, Paper, SimpleGrid, Text, TextInput, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import Header from '../../components/header';
import Tree from '../../components/misc/Tree';
import { useGetCategoriesTreeQuery } from '../../state/categories/api';
import { useGetPublicProductsQuery } from '../../state/products/api';

export default function Home() {
	const [search, setSearch] = useState('');
	const [opened, setOpened] = useState(false);
	const [activePage, setPage] = useState(1);

	const [debouncedSearch] = useDebouncedValue(search, 1_000);

	const { data: categories = [] } = useGetCategoriesTreeQuery();
	const { data: products = {} } = useGetPublicProductsQuery({ search: debouncedSearch, page: activePage, per_page: 8 });

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<Container size='lg'>
				<Paper>
					<Title align='center'>Categorii principale</Title>
					<Tree options={categories} />
				</Paper>
				<Paper mt='xl' p='lg'>
					<Title align='center' py='lg'>
						Produse
					</Title>
					<TextInput label='Search' placeholder='Type here' value={search} onChange={(e) => setSearch(e.target.value)} mb='md' />
					<SimpleGrid cols={4}>
						{products?.data?.map((product) => (
							<Card key={product.id} shadow='sm' padding='lg' radius='md' withBorder>
								<Card.Section>
									<Image src={product?.product_images?.[0]?.image_url} withPlaceholder height={160} alt='Norway' />
								</Card.Section>
								<Group position='apart' mt='md' mb='xs'>
									<Text weight={500}>{product.name}</Text>
									<Badge color='pink' variant='light'>
										On Sale
									</Badge>
								</Group>
								<Text size='sm' color='dimmed'>
									{product.description}
								</Text>
								<Button variant='light' color='blue' fullWidth mt='md' radius='md'>
									Book classic tour now
								</Button>
							</Card>
						))}
					</SimpleGrid>
					{!!products?.data?.length && (
						<Center>
							<Pagination py='lg' value={activePage} onChange={setPage} total={products.last_page} />
						</Center>
					)}
				</Paper>
			</Container>
		</div>
	);
}
