import { Container, Title, TopBar, Filters, ProductsGroupList } from "@/components/shared";

export default function Home() {
	return (<>
		<Container className="mt-10">
			<Title text="Все пиццы" size="lg" className="font-extrabold" />
		</Container>

		<TopBar />

		<Container className="mt-10 pb-14">
			<div className="flex gap-[80px]">
				<div className="w-[250px]">
					<Filters />
				</div>

				<div className="flex-1">
					<div className="flex flex-col gap-16">
						<ProductsGroupList
							title="Пиццы"
							items={[
								{ id: 1, name: "Пицца-чизбургер", imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d6013454cd6be264fc142d1bd35.avif", price: 550, items: [{ price: 550 }] }
							]}
							categoryId={1}
						/>

						<ProductsGroupList
							title="Завтрак"
							items={[
								{ id: 1, name: "Пицца-чизбургер", imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d6013454cd6be264fc142d1bd35.avif", price: 550, items: [{ price: 550 }] }
							]}
							categoryId={2}
						/>
					</div>
				</div>
			</div>
		</Container>
	</>);
}
