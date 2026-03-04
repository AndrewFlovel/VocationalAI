-- Migration 002: feedback table
create table feedback (
  id uuid default gen_random_uuid() primary key,
  satisfaction smallint not null check (satisfaction >= 1 and satisfaction <= 5),
  comment text,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table feedback enable row level security;

-- Policies: Anyone can insert (including anonymous if enabled in Supabase settings)
create policy "Allow anonymous and authenticated inserts" 
on feedback for insert with check (true);

-- Optional: Allow users to see their own feedback
create policy "Users can see their own feedback"
on feedback for select using (auth.uid() = user_id);
