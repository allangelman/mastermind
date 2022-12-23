export const Header = () => {
  return (
    <>
      <div className="flex justify-center mb-8 py-4 top-0 ">
        <div className="text-5xl">mastermind</div>
        {/* <div className="flex flex-wrap justify-center space-x-4">
          <HeaderCategory name={"coding"} href={"/Coding"} />
          <HeaderCategory name={"3d art"} href={"/3DArt"} />
          <HeaderCategory name={"immersive"} href={"/VRAR"} />
          <HeaderCategory name={"painting"} href={"/Painting"} />
          <HeaderCategory name={"sewing"} href={"/Painting"} />
          <HeaderCategory name={"about"} />
        </div> */}
      </div>
    </>
  );
};

// interface HeaderCategoryProps {
//   name: string;
//   href?: string;
// }

// const HeaderCategory = ({ name, href }: HeaderCategoryProps) => {
//   return (
//     <Link href={href ?? "/"}>
//       <div className="text-lg whitespace-nowrap">{name}</div>
//     </Link>
//   );
// };
