#!/usr/bin/env bash
# Netlify build-ignore hook.  Exit 0 = SKIP the build, non-zero = BUILD.
#
# Skips builds for commits that touch only root-level *.md files or .claude/.
# Everything else builds.  Netlify meters a production deploy at 15 credits
# flat, so a README commit otherwise costs the same as a real release.
#
# Deliberately does NOT use git exclude pathspecs -- ':(exclude,glob)*.md'
# inline in netlify.toml gets mangled on its way through TOML and the shell,
# and git then reports no differences at all, silently skipping EVERY deploy.
# Verified on this site 2026-09-04: plain `git diff A B` builds correctly,
# the same diff plus an inline exclude pathspec skips a real source change.
# Plain filename matching below avoids the whole hazard.
set -u

# No usable refs -> build.  Failing open is the only safe direction here.
[ -z "${CACHED_COMMIT_REF:-}" ] && exit 1
[ -z "${COMMIT_REF:-}" ] && exit 1

changed=$(git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF") || exit 1
[ -z "$changed" ] && exit 0

while IFS= read -r f; do
  [ -z "$f" ] && continue
  case "$f" in
    .claude/*) continue ;;   # agent scratch, never shipped
    */*)       exit 1 ;;     # any other nested file is real -> build
    *.md)      continue ;;   # root-level docs
    *)         exit 1 ;;     # root-level non-doc -> build
  esac
done <<EOF
$changed
EOF

exit 0
