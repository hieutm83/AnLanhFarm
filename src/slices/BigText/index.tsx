import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-[60vh] w-screen overflow-hidden bg-[#FE6334] text-[#FEE832] flex items-center justify-center"
    >
      <h2 className="grid gap-[2vw] text-center font-black uppercase leading-[.7]">
        <div className="text-[14vw]">Tea</div>
        <div className="grid gap-[2vw] text-[24vw] md:flex md:text-[4vw]">
          <span className="inline-block">that </span>
          <span className="inline-block max-md:text-[20vw]">makes </span>
          <span className="inline-block max-md:text-[30vw]">you </span>
        </div>
        <div className="text-[12vw]">Peace</div>    
      </h2>
    </section>
  );
};


export default BigText;
