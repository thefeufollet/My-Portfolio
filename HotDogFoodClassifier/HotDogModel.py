#!/usr/bin/env python3
"""
Local entry point for W&B Weave evaluation (alias of eval.py).
"""

from eval import main

if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
