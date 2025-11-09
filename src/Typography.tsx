import clsx from 'clsx';
import { forwardRef, type ReactNode } from 'react';

type hSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const sizeClasses = {
	h1: 'text-[24px]',
	h2: 'text-[18px]',
	h3: 'text-[14px]',
	h4: 'text-base',
	h5: 'text-sm',
	h6: 'text-xs',
};

interface Props {
	children: ReactNode;
	size?: hSize;
	className?: string;
}

const Typography = forwardRef<HTMLHeadingElement, Props>(
	({ size = 'h2', className, children }: Props, ref) => {
		const baseClasses = 'font-medium font-[Inkulinati]';
		switch (size) {
			case 'h1':
				return (
					<h1
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h1>
				);
			case 'h2':
				return (
					<h2
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h2>
				);
			case 'h3':
				return (
					<h3
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h3>
				);
			case 'h4':
				return (
					<h4
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h4>
				);
			case 'h5':
				return (
					<h5
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h5>
				);
			case 'h6':
				return (
					<h6
						ref={ref}
						className={clsx(baseClasses, sizeClasses[size], className)}
					>
						{children}
					</h6>
				);
		}
	}
);

export default Typography;
