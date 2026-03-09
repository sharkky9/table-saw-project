#!/usr/bin/env python3

import re
import sys
from pathlib import Path


INLINE_LINK = re.compile(r"(?<!!)\[([^\]]+)\]\(([^)]+)\)")


def iter_markdown_files(path: Path) -> list[Path]:
    if path.is_file():
        return [path]
    return sorted(candidate for candidate in path.rglob("*.md") if candidate.is_file())


def normalized_target(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1].strip()
    return target


def is_ignored_target(target: str) -> bool:
    return (
        target == ""
        or target.startswith("#")
        or target.startswith("http://")
        or target.startswith("https://")
        or target.startswith("mailto:")
    )


def split_target(target: str) -> str:
    return target.split("#", 1)[0].split("?", 1)[0]


def check_file(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text()
    for lineno, line in enumerate(text.splitlines(), start=1):
        for _, raw_target in INLINE_LINK.findall(line):
            target = normalized_target(raw_target)
            if is_ignored_target(target):
                continue
            link_path = split_target(target)
            if not link_path:
                continue
            if link_path.startswith("/"):
                errors.append(f"{path}:{lineno} uses absolute local link: {target}")
                continue
            resolved = (path.parent / link_path).resolve()
            if not resolved.exists():
                errors.append(f"{path}:{lineno} points to missing relative target: {target}")
    return errors


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: check_doc_links.py <file-or-dir> [<file-or-dir> ...]", file=sys.stderr)
        return 2

    errors: list[str] = []
    checked: list[Path] = []
    for arg in sys.argv[1:]:
        path = Path(arg)
        if not path.exists():
            errors.append(f"{path} does not exist")
            continue
        for markdown_file in iter_markdown_files(path):
            checked.append(markdown_file)
            errors.extend(check_file(markdown_file))

    if errors:
        print("doc-link check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"validated markdown links across {len(checked)} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
