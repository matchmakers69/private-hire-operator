function TypingDots() {
	return (
		<div className="flex space-x-1">
			<span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
			<span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
			<span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
		</div>
	);
}

export default TypingDots;
